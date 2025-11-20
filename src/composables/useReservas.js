// src/composables/useReservas.js

import { reactive, onMounted, ref } from "vue";
import Localbase from "localbase";

export function useReserva() {
    
    let db; 
    
    // 1. Estado Reativo: Lista para o componente de listagem
    const reservas = ref([]); 

    // 2. Estado Reativo: Formulário de adição
    const form = reactive({
        nome: "", // Nome da Sala
        responsavelKey: "", // ID do Professor
        dataReserva: "",
        horaInicio: "",
        horaFim: "",
    });

    // Função que busca e faz o JOIN
    const capturarReservas = async () => {
        if (!db) return; 

        try {
            // Busca Reservas e Professores em paralelo
            const [reservasRaw, professoresRaw] = await Promise.all([
                db.collection("reservas").get(),
                db.collection("professores").get()
            ]);

            // Cria o mapa de ID para Nome
            const professoresMap = professoresRaw.reduce((acc, prof) => {
                acc[prof.key] = prof.nome;
                return acc;
            }, {});

            // Mapeia a lista, injetando o nome do responsável
            reservas.value = reservasRaw.map(reserva => ({
                ...reserva,
                // INJETADO: Campo que será usado na listagem
                responsavelNome: professoresMap[reserva.responsavelKey] || 'Professor Não Encontrado'
            }));

        } catch (error) {
            console.error("Erro ao buscar e mapear reservas:", error);
        }
    };
    
    onMounted(() => {
        db = new Localbase("dbReserv"); 
        capturarReservas(); // Carrega a lista na inicialização
    });

    const reservarSala = async () => {
        if (!db) return false; 
        
        try {
            // Salva no DB usando as propriedades que o listador espera (nomeSala, responsavelKey)
            await db.collection("reservas").add({
                nomeSala: form.nome, 
                responsavelKey: form.responsavelKey, 
                dataReserva: form.dataReserva, 
                horaInicio: form.horaInicio, 
                horaFim: form.horaFim, 
                dataCriacao: new Date().toISOString(),
            });
            
            // Limpa o formulário e...
            form.nome = "";
            form.responsavelKey = "";
            form.dataReserva = "";
            form.horaInicio = "";
            form.horaFim = "";
            
            // Recarrega a lista para mostrar a nova reserva
            await capturarReservas(); 

            return true;
            
        } catch (error) {
            console.error("ERRO FATAL AO SALVAR NO DB:", error); 
            return false;
        }
    };

    return {
        form,
        reservarSala,
        reservas, // Exporta a lista mapeada
        capturarReservas
    };
}