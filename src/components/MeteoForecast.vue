<template>
  <div class="py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Previsão para os próximos dias</h2>
      <div v-if="!locationStore.error && (weatherStore.currentWeather || weatherStore.forecast)"
        class="grid grid-cols-1 mb-4">
        <MeteoCard :weather="weatherStore.currentWeather" day="Agora" />
      </div>
      <div v-if="!locationStore.error && weatherStore.forecast"
        class="grid justify-center items-center grid-cols-1 md:grid-cols-3 gap-8">
        <template v-for="(weather, index) in weatherStore.forecast" v-bind:key="index">
          <MeteoCard :weather="weather" :day="day(index)" />
        </template>
      </div>
      <div v-if="locationStore.error" class="text-center text-red-500">
        {{ locationStore.error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLocationStore } from '@/stores/location';
import { useWeatherStore } from '@/stores/weather';
import { watch } from 'vue';
import MeteoCard from './MeteoCard.vue';

const locationStore = useLocationStore();
const weatherStore = useWeatherStore();

watch(() => locationStore.location, async () => {
  await weatherStore.fetchCurrentWeather(locationStore.location.lat, locationStore.location.lon);
  await weatherStore.fetchForecast(locationStore.location.lat, locationStore.location.lon);
});

const day = (index) => {
  return index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : 'Depois de amanhã';
};
</script>
