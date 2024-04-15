import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        setError(data.message)
        return
      }

      localStorage.setItem('token', data.token)
      console.log(data.userId)
      navigate('/')
    } catch (error) {
      console.log('entro al error')
      setError(error.message)
    }
  }

  return (
    <div className='absolute top-0 z-[-2] h-screen w-screen flex bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
      <section className='w-full flex flex-col justify-center items-center gap-4'>
        <form onSubmit={handleLogin} className='w-[400px]'>
          <div className='mb-3'>
            <label htmlFor='email' className='block mb-1 text-sm font-medium text-gray-500'>Email</label>
            <input
              id='email'
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              className='rounded-md bg-gray-200 p-2 w-full border-2 border-gray-100'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block mb-1 text-sm font-medium text-gray-500'>Password</label>
            <input
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              className='rounded-md bg-gray-200 p-2 w-full border-2 border-gray-100'
            />
          </div>
          <button className='bg-main-500 hover:bg-main-600 rounded-md w-full text-white p-3'>Login</button>
        </form>
        {error && <div className='text-red-500 text-sm w-[400px]'>{error}</div>}
      </section>
    </div>
  )
}
