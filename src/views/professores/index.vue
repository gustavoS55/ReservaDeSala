<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Professores </template>
      <template v-slot:action> Lista de Professores</template>
    </breadcrumbs>
  </div>
  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex">
          <div class="flex-1 mb-5 text-2xl">Professores</div>
          <!-- Botão Primário: Usando a cor de destaque (verde-menta) -->
          <button 
            class="btn text-gray-800 shadow-md hover:shadow-lg transition duration-300"
            :style="{ backgroundColor: '#A9DFD9', borderColor: '#A9DFD9' }" 
            @click="reservar">Adicionar Professor
          </button>
        </div>
        
        <!-- Bloco de Empty State (v-if) -->
        <div v-if="professores.length === 0" class="text-center p-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 mt-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
           stroke="currentColor" 
            class="w-16 h-16 mx-auto mb-4 text-gray-400"> 
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
    
             <p class="text-lg font-semibold">Nenhum professor encontrado.</p>
    
          </div>
        
        <!-- Tabela de Reservas (v-else) -->
        <table v-else class="table table- w-full">
          <thead>
            <tr>
              <th></th> 
              <th>Nome</th>
              <th>Matéria</th>

            </tr>
          </thead>
          <tbody>
            <!-- Loop de Dados -->
            <tr v-for="professor in professores" :key="professor.id">
              <th>
              </th>
              
              <!-- Coluna 1: Nome da Sala -->
              <td>
                <div class="font-bold">{{ professor.nome }}</div>
              </td>
              
              <!-- Coluna 2: Responsável -->
              <td>
                <span class="text-sm opacity-80">{{ professor.materia }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import breadcrumbs from "@/components/breadcrumbs.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Localbase from "localbase";

let db;
onMounted(() => {
  // Inicialização do DB sincronizada
  db = new Localbase("dbReserv"); 
  capturarProfessores();
});

const professores = ref([]);

const capturarProfessores = async () => {
  try {
    professores.value = await db.collection("professores").get(); 
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
  }
};

const router = useRouter();

const reservar = () => {
  router.push({ name: "professores.add" }); 
};
</script>

<style lang="scss" scoped></style>