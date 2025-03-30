<template>
  <div class="bg-gradient-to-r from-sky-400 to-blue-500 flex-col justify-center items-center py-40">
    <h1 class="text-6xl text-white font-bold mb-4 text-center">Previsão do Tempo Precisa e Confiável</h1>
    <p class="text-xl text-white mb-8 text-center">
      Fique por dentro das condições meteorológicas em tempo real
    </p>
    <form class="flex mx-auto max-w-md">
      <input type="text" class="rounded px-3 py-2 flex-grow md:w-[304px] bg-white" placeholder="Digite o nome da cidade"
        v-model="cityName" @keypress.enter.prevent="fetchCoordinates">
      <button @click.prevent="fetchCoordinates" class="ml-2 bg-[#181818] text-white px-4 py-2 flex rounded">
        <Search class="mr-2" />
        Buscar
      </button>
    </form>
    <ErrorMessage v-if="locationStore.error">{{ locationStore.error }}</ErrorMessage>
  </div>
</template>

<script setup>
import { useLocationStore } from '@/stores/location';
import { Search } from 'lucide-vue-next';
import { onMounted, ref } from 'vue';
import ErrorMessage from './ErrorMessage.vue';

const locationStore = useLocationStore();
const cityName = ref('');

const fetchCoordinates = async () => {
  await locationStore.coordenatesFetch(cityName.value);
};

onMounted(() => {
  locationStore.getUserLocation();
});
</script>