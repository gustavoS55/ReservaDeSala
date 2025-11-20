// Cuidado: Remova qualquer tag <script setup> ou <template> que possa ter vindo
// junto ao copiar o código. O arquivo DEVE ser apenas o JavaScript puro.

import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";

export function useProfessor() {

    let db; 
    
    const professores = ref([]); 
    const form = reactive({
        nome: "",
        materia: "",
    });

    onMounted(() => {
        // Inicialização do Localbase
        db = new Localbase("dbReserv"); 
        capturarProfessores(); 
    });

    const capturarProfessores = async () => {
        try {
            // Verifica se 'db' está pronto antes de tentar usar
            if (!db) {
                console.warn("DB não inicializado. Tentando capturar professores mais tarde.");
                return;
            }
            professores.value = await db.collection("professores").get();
        } catch (error) {
            console.error("Erro ao buscar professores:", error);
        }
    };
    
    const adicionarProfessor = async () => {
        if (!form.nome || !form.materia) {
            alert("Por favor, preencha o nome e a matéria.");
            return false;
        }

        try {
            await db.collection("professores").add({
                nome: form.nome,
                materia: form.materia,
                dataCadastro: new Date().toISOString(),
            }); 

            form.nome = "";
            form.materia = "";
            await capturarProfessores(); 
            
            return true; 
            
        } catch (error) {
            console.error("Erro ao salvar professor:", error);
            return false;
        }
    };

    return {
        professores,
        form,
        capturarProfessores,
        adicionarProfessor
    };
}