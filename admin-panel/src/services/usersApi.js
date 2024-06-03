const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const getUser = async (userId) => {
  const response = await fetch(`${API_URL}/auth/user/${userId}`)
  return checkResponse(response)
}

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/auth/users`)
  return checkResponse(response)
}

export const updateUser = async (userData, userId) => {
  const response = await fetch(`${API_URL}/auth/user/${userId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(userData)
  })
  return checkResponse(response)
}

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/auth/user/${userId}`, {
    method: 'DELETE'
  })
  return checkResponse(response)
}
