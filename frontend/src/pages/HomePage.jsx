import { Link } from 'react-router-dom'

function HomePage () {
  return (
    <>
      <nav className='bg-white border-b-2 border-main-100'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <Link to='/'>
            <span className='text-2xl font-semibold whitespace-nowrap'>TecnoNexo</span>
          </Link>
          <div className='flex gap-4'>
            <Link to='/login'>
              <button className='bg-main bg-main-500 px-4 py-2 rounded-md text-white '>Iniciar sesión</button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default HomePage
