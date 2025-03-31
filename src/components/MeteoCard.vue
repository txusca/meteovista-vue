<template>
  <div class="bg-white p-6 rounded-lg shadow-md text-center">
    <h3 class="text-xl font-semibold mb-2">{{ day }}</h3>
    <div v-if="day === 'Agora'">
      <p class="mb-2 text-3xl font-bold">{{ convertTemp }}º</p>
    </div>
    <div v-else>
      <p class="text-xl">Mínima: {{ convertTemp.min }}º</p>
      <p class="text-xl">Máxima: {{ convertTemp.max }}º</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const { weather, day } = defineProps({ weather: {}, day: String })

console.log(weather)
const convertTemp = computed(() => {
  if (day === 'Agora') {
    return Math.floor((weather?.main.temp ?? 0) - 273.15);
  }
  return {
    min: Math.floor((weather?.temp.min ?? 0) - 273.15),
    max: Math.floor((weather?.temp.max ?? 0) - 273.15),
  };
});
</script>