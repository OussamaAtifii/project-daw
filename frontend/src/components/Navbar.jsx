import { Link } from 'react-router-dom'

import cart from '../assets/cart.svg'
import search from '../assets/search.svg'

export default function Navbar () {
  return (
    <nav className='bg-white border-b-2 border-main-100 mb-4'>
      <div className='flex flex-wrap items-center justify-between py-4 max-w-screen-xl mx-auto'>
        <Link to='/'>
          <span className='text-2xl font-semibold whitespace-nowrap'>TecnoNexo</span>
        </Link>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <img src={search} alt='Icono de busqueda' className='w-4 h-4 text-gray-500' />
          </div>
          <input type='text' className='bg-gray-50 border border-gray-300 text-sm rounded-lg  ps-10 p-2.5' placeholder='Buscar' />
        </div>
        <div className='flex gap-4'>
          <Link to='/login'>
            <button className='bg-main bg-main-500 hover:bg-main-600 px-4 py-2 rounded-md text-white'>Iniciar sesión</button>
          </Link>
          <img src={cart} alt='Icono de carrito' />
        </div>
      </div>
    </nav>
  )
}
