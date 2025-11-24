<template>
  <div class="w-full">
    <form @submit.prevent="handleReserva">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend class="fieldset-legend">Reservando Salas</legend>

     <label class="label">Sala</label>
        <select class="select w-full" v-model="form.nome">
          <option value="" disabled selected>Selecione Sala</option>
          <option 
            v-for="sala in salas" 
            :key="sala.key" 
            :value="sala.nome"> {{ sala.nome }}
          </option>
        </select>

        <label class="label">Responsável</label>
        <select class="select w-full" v-model="form.responsavelKey">
          <option value="" disabled selected>Selecione Professor</option>
          <option 
            v-for="professor in professores" 
            :key="professor.key" 
            :value="professor.key"> 
            
            {{ professor.data.nome }} 
          </option>
        </select>
        <h3 class="mt-4 text-lg font-medium">Período da Reserva</h3>
        
        <label class="label">Data da Reserva</label>
        <input
          type="date"
          class="input w-full"
          v-model="form.dataReserva"
        />

        <div class="flex gap-4">
          <div class="flex-1">
            <label class="label">Hora de Início</label>
            <input type="time" class="input w-full" v-model="form.horaInicio" />
          </div>
          <div class="flex-1">
            <label class="label">Hora de Fim</label>
            <input type="time" class="input w-full" v-model="form.horaFim" />
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; align-items: center; gap: 500px;">
          <button 
            class="btn mt-4 text-gray-800" 
            style="background-color: #A9DFD9; border-color: #A9DFD9; width: 200px;" 
            type="submit"> Salvar
          </button>

          <button 
            class="btn mt-4 text-gray-800" 
            style="background-color: #F08080; border-color: #F08080;width: 200px;" 
            @click="voltar" 
            type="button"> Voltar
          </button>
        </div>
        
      </fieldset>

      <div class="toast" v-if="toastVisible">
        <div role="alert" class="alert alert-success">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg> 
          <span>Reserva da Sala {{ nomeCompletoToast }} salva com sucesso.</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useProfessor } from "@/composables/useProfessor"; 
import { useReserva } from "@/composables/useReservas"; 
import {useSalas} from "@/composables/useSalas";

const router = useRouter();

// Dados de Professores (para o <select>)
const { professores } = useProfessor();

// Dados e Ação de Reserva (para o formulário e salvamento)
const { form, reservarSala } = useReserva(); 

const {salas} = useSalas();

const toastVisible = ref(false);
const nomeCompletoToast = ref("");

const voltar = () => {
  router.push('/reserva');
};

const handleReserva = async () => {
  const nomeSalaSalva = form.nome; 
  const sucesso = await reservarSala(); // Salva e recarrega a lista

  if (sucesso) {
    nomeCompletoToast.value = nomeSalaSalva;
    toastVisible.value = true;
    
    setTimeout(() => {
      toastVisible.value = false;
    }, 3000);
  }
};
 
</script>