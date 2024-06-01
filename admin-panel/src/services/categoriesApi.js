const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const getCategory = async (categoryId) => {
  const response = await fetch(`${API_URL}/categories/${categoryId}`)
  return checkResponse(response)
}

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`)
  return checkResponse(response)
}
