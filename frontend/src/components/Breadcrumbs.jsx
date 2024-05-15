import { useMatches } from 'react-router-dom'
import { ArrowRightIcon } from './Icons'

export default function Breadcrumbs ({ name = '' }) { // Aquí usamos destructuración para obtener la prop 'name'
  const matches = useMatches()
  const crumbs = matches
    // Filtramos los matches que no tengan handle y crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // Mapeamos los matches en un array de elementos
    .map((match) => match.handle.crumb(match.data))

  return (
    <ol className='flex items-center space-x-1 md:space-x-2 max-w-screen-xl mx-auto'>
      {/* Aquí puedes usar 'name' si necesitas, por ejemplo en un encabezado */}
      {crumbs.map((crumb, index) => {
        if (index === crumbs.length - 1 && name) {
          return (
            <li key={index} className=' flex items-center gap-2 text-sm font-medium text-gray-700'>{crumb} <ArrowRightIcon size={20} /> {name}</li>
          )
        }
        return <li key={index} className='flex'>{crumb}</li>
      })}
    </ol>
  )
}
