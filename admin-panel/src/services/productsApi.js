const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products/all-data`)
  return checkResponse(response)
}
