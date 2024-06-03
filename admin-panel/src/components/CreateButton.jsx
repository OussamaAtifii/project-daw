import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function CreateButton ({ model }) {
  const modelName = {
    category: 'categoría',
    brand: 'marca',
    product: 'producto'
  }

  return (
    <Link to={`/${model}/create`}>
      {
        modelName[model] && (
          <Button className='flex gap-2 p-3'>
            Crear {modelName[model]}
          </Button>
        )
      }
    </Link>
  )
}
