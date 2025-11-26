
import { reactive, onMounted, ref } from "vue";
import Localbase from "localbase";

export function useReserva() {
    
    let db; 
    
    
    const reservas = ref([]); 

    
    const form = reactive({
        nome: "", 
        responsavelKey: "", 
        dataReserva: "",
        horaInicio: "",
        horaFim: "",
    });


    const capturarReservas = async () => {
        if (!db) return; 

        try {
            
            const [reservasRaw, professoresRaw] = await Promise.all([
                db.collection("reservas").get(),
                db.collection("professores").get({keys:true})
            ]);

        
            const professoresMap = professoresRaw.reduce((acc, prof) => {
                acc[prof.key] = prof.data.nome;
                return acc;
            }, {});

            console.log(professoresMap)

            reservas.value = reservasRaw.map(reserva => ({
                ...reserva,

                responsavelNome: professoresMap[reserva.responsavelKey] || 'Professor Não Encontrado'
            }));

        } catch (error) {
            console.error("Erro ao buscar e mapear reservas:", error);
        }
    };
    
    onMounted(() => {
        db = new Localbase("dbReserv"); 
        capturarReservas();
    });

    const reservarSala = async () => {
        if (!db) return false; 
        
        try {
            console.log(form)
            await db.collection("reservas").add({
                nomeSala: form.nome, 
                responsavelKey: form.responsavelKey, 
                dataReserva: form.dataReserva, 
                horaInicio: form.horaInicio, 
                horaFim: form.horaFim, 
                dataCriacao: new Date().toISOString(),
            });
            
            form.nome = "";
            form.responsavelKey = "";
            form.dataReserva = "";
            form.horaInicio = "";
            form.horaFim = "";
            
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
        reservas, 
        capturarReservas
    };
}