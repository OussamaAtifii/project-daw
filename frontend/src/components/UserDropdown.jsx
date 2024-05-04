import { useState, useEffect, useRef } from 'react'
import { UserIcon } from './Icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function UserDropdown () {
  const [open, setOpen] = useState(false)
  const { logout } = useAuth()
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Función para cerrar el menú cuando se hace clic fuera de él
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Agregar event listener cuando el menú está abierto
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // Limpiar event listener al desmontar el componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <button onClick={handleOpen}>
        <UserIcon />
      </button>
      {open && (
        <ul ref={dropdownRef} className='absolute left-1/2 transform -translate-x-1/2 top-full bg-white border border-gray-200 mt-1 rounded-md shadow-md text-nowrap'>
          <Link to='/'>
            <li className='py-1 px-3 hover:bg-gray-100'>Perfil</li>
          </Link>
          <Link to='/orders'>
            <li className='py-1 px-3 hover:bg-gray-100'>Mis pedidos</li>
          </Link>
          <button onClick={logout}>
            <li className='py-1 px-3 hover:bg-gray-100'>Cerrar sesión</li>
          </button>
        </ul>
      )}
    </>
  )
}
