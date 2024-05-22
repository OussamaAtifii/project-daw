export async function getCategories () {
  const response = fetch('http://localhost:3000/categories')

  if (!response.ok) {
    throw new Error('Error fetching categories')
  }

  const categories = await response.json()
  return categories
}
