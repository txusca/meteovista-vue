import { defineStore } from 'pinia'
import { ref } from 'vue'

// TODO: Em casos de mais de uma cidade recebida na requisição tratar de alguma forma, talvez com um dropdown para que o usuário escolha qual quer usar.
export const useLocationStore = defineStore('location', () => {
  const coordenates = ref({ lat: 0, lon: 0 })
  const geolocation = ref({})
  const error = ref(null)
  const key = import.meta.env.VITE_OPEN_WEATHER_KEY
  const coordenatesFetch = async (cidade) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${key}`,
      )
      const data = await response.json()
      if (data.length === 0) error.value = 'Localização não encontrada'
      geolocation.value = { ...data[0] }
      console.log('Geolocalização obtida:', geolocation.value)
    } catch (err) {
      error.value = err
      console.error('Erro ao buscar coordenadas:', err)
    }
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          coordenates.value = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          console.log('Localização do usuário:', coordenates.value)
        },
        (error) => {
          console.error('Erro ao obter a localização do usuário:', error)
        },
      )
    } else {
      console.error('Geolocalização não é suportada por este navegador.')
    }
  }

  return { coordenates, error, geolocation, coordenatesFetch, getUserLocation }
})
