import { Link } from 'react-router-dom'

import { CartIcon, SearchIcon, UserIcon } from './Icons'
import { useCart } from '../hooks/useCart'
import UserDropdown from './UserDropdown'

import Logo from '../assets/logo.png'
import { useAuth } from '../hooks/useAuth'

export default function Navbar () {
  const { cart } = useCart()
  const { isLoggedIn, user } = useAuth()

  return (
    <nav className='bg-white border-b-2 border-main-100 sticky top-0 z-50 mb-8'>
      <div className='flex flex-wrap items-center justify-between py-4 max-w-screen-xl mx-auto'>
        <Link to='/' className='flex justify-center items-center gap-2'>
          <img src={Logo} alt='' className='w-10' />
          <span className='text-2xl font-semibold whitespace-nowrap'>TecnoNexo</span>
        </Link>
        <div className='relative w-[500px]'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <SearchIcon />
          </div>
          <input type='text' className='bg-gray-50 border border-gray-300 text-sm rounded-lg w-full ps-10 p-2.5' placeholder='Buscar' />
        </div>
        <div className='flex gap-2'>
          {
            !isLoggedIn && !user && (
              <>
                <Link to='/login'>
                  <button className='bg-main bg-white border border-main-400 text-main-400 hover:border-main-500 hover:text-main-500 px-4 py-2 rounded'>Iniciar sesión</button>
                </Link>
                <Link to='/login'>
                  <button className='bg-main bg-main-500 hover:bg-main-600 px-4 py-2 rounded text-white border'>Registrate</button>
                </Link>
              </>
            )
          }
          <Link to='/cart' className='relative content-center py-1 px-2 rounded-md hover:bg-gray-200 cursor-pointer'>
            <CartIcon />
            <div className='absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 border border-white rounded-full -top-0 -end-0'>{cart.length}</div>
          </Link>
          <div className='flex justify-center items-center relative'>
            <UserDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
