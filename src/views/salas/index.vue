<template>
  <div class="mb-2">
    <breadcrumbs>
      <template v-slot:model> Salas </template>
      <template v-slot:action> Lista de Salas </template>
    </breadcrumbs>
  </div>
  <div class="card w-full bg-base-100 shadow-sm card-border">
    <div class="card-body">
      <div class="overflow-x-auto">
        <div class="flex">
          <div class="flex-1 mb-5 text-2xl">Salas</div>

          <button 
            class="btn text-gray-800 shadow-md hover:shadow-lg transition duration-300"
            :style="{ backgroundColor: '#A9DFD9', borderColor: '#A9DFD9' }" 
            @click="addSalas">Adiconar Sala
          </button>
        </div>
        
        <!-- Bloco de Empty State (v-if) -->
        <div v-if="salas.length === 0" class="text-center p-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 mt-4">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-16 h-16 mx-auto mb-4 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
          </svg>


            <p class="text-lg font-semibold">Nenhuma sala encontrada.</p>
        </div>
        
        <!-- Tabela de Reservas (v-else) -->
        <table v-else class="table table- w-full">
          <thead>
            <tr>
              <th></th> 
              <th>Sala</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop de Dados -->
            <tr v-for="sala in salas" :key="sala.id">
              <th>
              </th>
              
              <!-- Coluna 1: Nome da Sala -->
              <td>
                <div class="font-bold">{{ sala.nome }}</div>
              </td>
                <td>
                <span class="text-sm opacity-80">{{ sala.quantidade }}</span>
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
import add from "localbase/localbase/api/actions/add";
import AddSalas from "./addSalas.vue";

let db;
onMounted(() => {
  // Inicialização do DB sincronizada
  db = new Localbase("dbReserv"); 
  capturarSalas();
});

const salas = ref([]);

const capturarSalas = async () => {
  try {
    salas.value = await db.collection("salas").get(); 
  } catch (error) {
    console.error("Erro ao buscar Salas", error);
  }
};

const router = useRouter();

const addSalas = () => {
  router.push({ name: "sala.add" }); 
};
</script>

<style lang="scss" scoped></style>