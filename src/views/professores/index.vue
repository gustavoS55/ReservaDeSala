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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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