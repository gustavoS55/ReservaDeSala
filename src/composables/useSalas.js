// src/composables/useSalas.js

import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";

export function useSalas() {
    
    let db; 
    
    // 1. Estado Reativo: Lista de todas as salas para exibição
    const salas = ref([]); 

    // 2. Estado Reativo: Formulário de adição de sala
    const form = reactive({
        nome: "", // Apenas o nome da sala
    });

    // Função para buscar a lista de salas
    const capturarSalas = async () => {
        if (!db) return; 

        try {
            // BUSCA SIMPLES: Apenas na coleção 'salas'
            salas.value = await db.collection("salas").get();
        } catch (error) {
            console.error("Erro ao buscar salas:", error);
        }
    };
    
    onMounted(() => {
        db = new Localbase("dbReserv"); 
        capturarSalas(); // Carrega a lista na inicialização
    });

    // Função para Adicionar uma nova Sala
    const adicionarSala = async () => {
        if (!form.nome) return false; 
        
        try {
            // CRIAÇÃO SIMPLES: Salva na coleção 'salas'
            await db.collection("salas").add({
                nome: form.nome, 
                dataCadastro: new Date().toISOString(),
            });
            
            // Limpa o formulário e recarrega a lista
            form.nome = "";
            await capturarSalas(); 

            return true;
            
        } catch (error) {
            console.error("Erro ao salvar sala:", error); 
            return false;
        }
    };

    return {
        salas, // Lista de salas (para o dropdown no AddReservas e para a Lista de Salas)
        form, // Formulário de adição (para o AddSalas.vue)
        adicionarSala,
        capturarSalas
    };
}