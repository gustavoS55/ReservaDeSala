  <template>
    <div class="mb-2">
      <breadcrumbs>
        <template v-slot:model> Reservas </template>
        <template v-slot:action> Lista de Reservas </template>
      </breadcrumbs>
    </div>
    <div class="card w-full bg-base-100 shadow-sm card-border">
      <div class="card-body">
        <div class="overflow-x-auto">
          <div class="flex">
            <div class="flex-1 mb-5 text-2xl">Reservas</div>

            <button 
              class="btn text-gray-800 shadow-md hover:shadow-lg transition duration-300"
              :style="{ backgroundColor: '#A9DFD9', borderColor: '#A9DFD9' }" 
              @click="reservar">Reservar
            </button>
          </div>
          
          <!-- Bloco de Empty State (v-if) -->
          <div v-if="reservas.length === 0" class="text-center p-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-lg font-semibold">Nenhuma reserva encontrada.</p>
          </div>
          
          <!-- Tabela de Reservas (v-else) -->
          <table v-else class="table table- w-full">
            <thead>
              <tr>
                <th></th> 
                <th>Sala</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="reserva in reservas" :key="reserva.key"> <th>
              </th>
              
              <td>
                <div class="font-bold">{{ reserva.nomeSala }}</div>
              </td>
              
              <td>
                <span class="text-sm opacity-80">{{ reserva.responsavelNome }}</span>
              </td>

              <td>
                {{ new Date(reserva.dataReserva).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) }}
              </td>

              <td>
                <span class="badge badge-outline text-gray-700">{{ reserva.horaInicio }} - {{ reserva.horaFim }}</span>
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
import { useRouter } from "vue-router";
// 1. IMPORTAÇÃO CRÍTICA: Importa o Composable que faz o JOIN de dados
import { useReserva } from "@/composables/useReservas"; 

const router = useRouter();

const { reservas } = useReserva(); 

const reservar = () => {
  // Navega para a rota de adicionar reserva
  router.push({ name: "salas.add" }); 
};
</script>

  <style lang="scss" scoped></style>