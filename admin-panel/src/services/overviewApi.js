const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const getTotalOrders = async () => {
  const response = await fetch(`${API_URL}/orders/count`)
  return checkResponse(response)
}

export const getTotalUsers = async () => {
  const response = await fetch(`${API_URL}/auth/count`)
  return checkResponse(response)
}

export const getRecentSales = async () => {
  const response = await fetch(`${API_URL}/orders/recent`)
  return checkResponse(response)
}

export const getRevenue = async () => {
  const response = await fetch(`${API_URL}/orders/revenue`)
  return checkResponse(response)
}

export const getTotalReviews = async () => {
  const response = await fetch(`${API_URL}/reviews/count`)
  return checkResponse(response)
}
