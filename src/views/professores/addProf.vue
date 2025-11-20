<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Adicionando Professor</legend>

      <label class="label">Nome</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome Completo"
        v-model="form.nome"
      />

      <label class="label">Matéria/Disciplina</label>
      <input 
        type="text" 
        class="input w-full" 
        placeholder="Ex: Matemática, História, etc." 
        v-model="form.materia" 
      />
      <div style=" display: flex; align-items: center; justify-content: center; gap: 500px;">

        <button 
          class="btn mt-4 text-gray-800"style="background-color: #A9DFD9; border-color: #A9DFD9; width: 200px;" @click="adicionarProfessor">
          Salvar
        </button>

        <button 
          class="btn mt-4 text-gray-800"style="background-color: #F08080; border-color: #F08080; width: 200px;" @click="voltar">
          Voltar
        </button>

      </div>


    </fieldset>

    <div class="toast toast-end" v-if="toastVisible">
      <div role="alert" class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> 
        <span>Professor(a) {{ nomeCompletoToast }} salvo com sucesso.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";
import { useRouter } from "vue-router";

const voltar = () => {
  router.push('/professores');
};

const router = useRouter(); 

let db;
onMounted(() => {
  db = new Localbase("dbReserv"); 
});

const toastVisible = ref(false);
const nomeCompletoToast = ref(""); // Nome da variável padronizado

// Formulário reativo (variável padronizada para 'form')
const form = reactive({
  nome: "",
  materia: "", // Campo específico para professores
});

// Função para Adicionar Professor (CREATE)
const adicionarProfessor = async () => {
  if (!form.nome || !form.materia) {
    alert("Por favor, preencha o nome e a matéria do professor.");
    return;
  }

  try {
    await db.collection("professores").add({
      nome: form.nome,
      materia: form.materia,
      dataCadastro: new Date().toISOString(),
    });

    nomeCompletoToast.value = form.nome; // Usa o nome padronizado
    toastVisible.value = true;
    
  } catch (error) {
    console.error("Erro ao adicionar professor:", error);
  } finally {
    // Limpar o formulário
    form.nome = "";
    form.materia = "";
    
    // Ocultar o toast após 3 segundos
    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
/* Estilos */
</style>