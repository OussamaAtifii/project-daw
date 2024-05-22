import { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
import { columns } from './columns'
import { getCategories } from './utils'

export default function Categories () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3000/categories')

      if (!response.ok) {
        throw new Error('Error fetching categories')
      }

      const categories = await response.json()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      <DataTable columns={columns} data={categories} />
    </div>
  )
}
