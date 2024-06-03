const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const deleteModel = async (model, id) => {
  const url =
    model === 'user'
      ? `${API_URL}/auth/${model}/${id}`
      : `${API_URL}/${model}/${id}`

  console.log(url)

  const response = await fetch(url, {
    method: 'DELETE'
  })
  return checkResponse(response)
}
