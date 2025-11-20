<template>
  <div class="w-full">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend class="fieldset-legend">Adicionando Sala</legend>

      <label class="label">Nome</label>
      <input
        type="text"
        class="input w-full"
        placeholder="Nome da Sala"
        v-model="form.nome"
      />

      <label class="label">Quantidade</label>
      <input 
        type="text" 
        class="input w-full" 
        placeholder="Quantidade de Salas" 
        v-model="form.quantidade" 
      />
      <div style=" display: flex; align-items: center; justify-content: center; gap: 500px;">

        <button 
          class="btn mt-4 text-gray-800"style="background-color: #A9DFD9; border-color: #A9DFD9; width: 200px;" @click="addSalas">
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
        <span> Sala {{ nomeCompletoToast }} salvo com sucesso.</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import Localbase from "localbase";
import { useRouter } from "vue-router";

const voltar = () => {
  router.push('/salas');
};

const router = useRouter(); 

let db;
onMounted(() => {
  db = new Localbase("dbReserv"); 
});

const toastVisible = ref(false);
const nomeCompletoToast = ref("");

const form = reactive({
  nome: "",
  quantidade: "", 
});


const addSalas = async () => {
  if (!form.nome) {
    alert("Por favor, preencha o nome e a matéria da sala.");
    return;
  }

  try {
    await db.collection("salas").add({
      nome: form.nome,
      quantidade: form.quantidade,
      dataCadastro: new Date().toISOString(),
    });

    nomeCompletoToast.value = form.nome; 
    toastVisible.value = true;
    
  } catch (error) {
    console.error("Erro ao adicionar sala:", error);
  } finally {
 
    form.nome = "";
    form.quantidade = "";
    
  
    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
/* Estilos */
</style>