import { defineStore } from 'pinia'
import { ref } from 'vue'

// TODO: Em casos de mais de uma cidade recebida na requisição tratar de alguma forma, talvez com um dropdown para que o usuário escolha qual quer usar.
export const useLocationStore = defineStore('location', () => {
  const location = ref(null) // Armazena o objeto completo da API ou do navegador
  const error = ref(null)
  const key = import.meta.env.VITE_OPEN_WEATHER_KEY

  /**
   * Busca as coordenadas para um nome de cidade fornecido.
   * @param {string} city - O nome da cidade.
   */
  const coordinatesFetch = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`,
      )
      const data = await response.json()
      if (data.length === 0) {
        error.value = 'Localização não encontrada'
        // } else if (data.length > 1) {
        //   // TODO: Implementar dropdown para múltiplas cidades
        //   console.warn('Mais de uma cidade encontrada:', data)
      } else {
        location.value = data[0] // Armazena o objeto completo da primeira cidade
        console.log('Geolocalização obtida:', location.value)
      }
    } catch (err) {
      handleError(err, 'Erro ao buscar coordenadas')
    }
  }

  /**
   * Lida com erros registrando-os e atualizando o estado de erro.
   * @param {Error} err - O objeto de erro.
   * @param {string} message - Mensagem de erro personalizada.
   */
  const handleError = (err, message) => {
    error.value = message
    console.error(message, err)
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          location.value = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          console.log('Localização do usuário:', location.value)
        },
        (error) => {
          console.error('Erro ao obter a localização do usuário:', error)
        },
      )
    } else {
      console.error('Geolocalização não é suportada por este navegador.')
    }
  }

  return { location, error, coordinatesFetch, getUserLocation }
})
