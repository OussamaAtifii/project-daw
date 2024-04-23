const API_URL = 'http://localhost:3000'

export async function getCategories () {
  const response = await fetch(`${API_URL}/categories`)
  return response.json()
}

export async function getCategory (categoryId) {
  const response = await fetch(`${API_URL}/categories/${categoryId}`)
  return response.json()
}

export async function getCategoryProducts (categoryId) {
  const response = await fetch(`${API_URL}/products/category/${categoryId}`)
  return response.json()
}
