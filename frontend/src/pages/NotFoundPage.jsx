import { Link } from 'react-router-dom'

export default function NotFoundPage () {
  return (
    <div className='flex w-screen h-screen flex-col gap-4 justify-center items-center'>
      <h1 className='font-bold text-6xl'>404 Not Found!</h1>
      <Link to='/' className='bg-blue-500 px-4 py-2 rounded-sm text-center'>Volver a inicio</Link>
    </div>
  )
}
