import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref(null)
  const forecast = ref(null)
  const error = ref(null)
  const key = import.meta.env.VITE_OPEN_WEATHER_KEY
  /**
   * Busca a temperatura atual da localidade informada
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */
  const fetchCurrentWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`,
      )
      const data = await response.json()
      currentWeather.value = data
    } catch (error) {
      error.value = error
      console.error(error)
    }
  }

  /**
   * Busca a previsão das temperaturas para a localidade informada
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   */
  const fetchForecast = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=3&appid=${key}`,
      )
      const data = await response.json()
      forecast.value = data.list
    } catch (error) {
      error.value = error
      console.error(error)
    }
  }
  return { currentWeather, forecast, error, fetchCurrentWeather, fetchForecast }
})
