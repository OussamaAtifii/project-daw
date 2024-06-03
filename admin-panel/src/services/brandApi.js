const API_URL = import.meta.env.VITE_API_URL

const checkResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ocurrió un error al obtener los datos')
  }
  return response.json()
}

export const getBrand = async (brandId) => {
  const response = await fetch(`${API_URL}/brands/${brandId}`)
  return checkResponse(response)
}

export const getBrands = async () => {
  const response = await fetch(`${API_URL}/brands`)
  return checkResponse(response)
}

export const createBrand = async (data) => {
  const response = await fetch(`${API_URL}/brands`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
  })
  return checkResponse(response)
}

export const updateBrand = async (data, brandId) => {
  const response = await fetch(`${API_URL}/brands/${brandId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  return checkResponse(response)
}
