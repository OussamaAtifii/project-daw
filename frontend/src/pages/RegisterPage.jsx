import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
// import {
//   GoogleIcon,
//   LoginFacebookIcon,
//   LoginGithubIcon
// } from '../components/Icons'
// import LoginImage from '../assets/Designer.jpeg'

export default function RegisterPage () {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const { name, email, password, repeatPassword } = data
    console.log(data)

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })

      const data = await response.json()

      if (data.error) {
        console.log('error')
        setError(data.message)
        return
      }
      console.log(data)
      console.log('paso login')
      login(data)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError(
        'Hubo un problema al registrar. Por favor, inténtelo de nuevo.'
      )
    }
  }

  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      <div className='lg:w-1/2 flex flex-col justify-center items-center h-full gap-4 p-4'>
        <section className='w-full max-w-[500px]'>
          <h1 className='text-4xl font-semibold pb-4'>¡Bienvenido!</h1>
          <p className='pb-2'>Regístrate con</p>
          <div className='flex gap-4'>
            {/* <button className='rounded-md w-full hover:border-blue-500 hover:text-blue-500 transition-all border-2 flex justify-center items-center text-black'>
              <LoginFacebookIcon />
            </button>
            <button className='rounded-md w-full hover:border-red-500 hover:text-red-500 transition-all p-3 border-2 flex justify-center items-center text-black'>
              <GoogleIcon />
            </button>
            <button className='rounded-md w-full hover:border-gray-600 hover:text-gray-600 transition-all p-3 border-2 flex justify-center items-center text-black'>
              <LoginGithubIcon />
            </button> */}
          </div>
        </section>
        <section className='w-full max-w-[500px] flex justify-center items-center gap-2'>
          <span className='bg-gray-200 h-[2px] w-full' />
          <p className='text-xs text-nowrap'> o usa un correo </p>
          <span className='bg-gray-200 h-[2px] w-full' />
        </section>

        <section className='w-full max-w-[500px] relative'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <label
                htmlFor='name'
                className='block mb-1 text-sm font-medium text-gray-500'
              >
                Nombre
              </label>
              <input
                {...register('name', {
                  required: true,
                  minLength: 3
                })}
                id='name'
                type='text'
                className={`rounded-md p-2 w-full border ${
                  errors.name
                    ? 'border-red-500 bg-red-100'
                    : 'border-gray-100 bg-gray-200 '
                } `}
              />
              {errors.name?.type === 'required' && (
                <p className='text-red-500 text-xs pt-1'>
                  El nombre es obligatorio
                </p>
              )}
              {errors.name?.type === 'minLength' && (
                <p className='text-red-500 text-xs pt-1'>
                  El nombre debe tener al menos 3 caracteres
                </p>
              )}
            </div>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='block mb-1 text-sm font-medium text-gray-500'
              >
                Correo electrónico
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i
                })}
                id='email'
                type='text'
                className={`rounded-md p-2 w-full border ${
                  errors.email
                    ? 'border-red-500 bg-red-100'
                    : 'border-gray-100 bg-gray-200 '
                } `}
              />
              {errors.email?.type === 'required' && (
                <p className='text-red-500 text-xs pt-1'>
                  El correo electrónico es obligatorio
                </p>
              )}
              {errors.email?.type === 'pattern' && (
                <p className='text-red-500 text-xs pt-1'>
                  El correo electrónico no tiene un formato correcto
                </p>
              )}
            </div>
            <div className='mb-3'>
              <label
                htmlFor='password'
                className='block mb-1 text-sm font-medium text-gray-500'
              >
                Contraseña
              </label>
              <input
                {...register('password', {
                  minLength: 8,
                  required: true
                })}
                id='password'
                type='password'
                className={`rounded-md p-2 w-full border ${
                  errors.email
                    ? 'border-red-500 bg-red-100'
                    : 'border-gray-100 bg-gray-200 '
                } `}
              />
              {errors.password?.type === 'required' && (
                <p className='text-red-500 text-xs pt-1'>
                  La contraseña es obligatoria
                </p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className='text-red-500 text-xs pt-1'>
                  La contraseña debe tener al menos 8 caracteres
                </p>
              )}
            </div>
            <div className='mb-3'>
              <label
                htmlFor='repeatPassword'
                className='block mb-1 text-sm font-medium text-gray-500'
              >
                Repetir contraseña
              </label>
              <input
                {...register('repeatPassword')}
                id='repeatPassword'
                type='password'
                className='rounded-md bg-gray-200 p-2 w-full border border-gray-100'
              />
            </div>
            <button className='bg-main-500 hover:bg-main-600 rounded-md w-full text-white p-3 mb-1'>
              Registrarse
            </button>
            {error && (
              <p
                className='w-full text-center text-red-500 mb-4 font-normal text-sm'
                role='alert'
              >
                {error}
              </p>
            )}
            <p className='text-center text-sm'>
              ¿No tienes una cuenta?{' '}
              <Link to='/login' className='text-main-500 italic'>
                Inicia sesión
              </Link>
            </p>
          </form>
        </section>
      </div>
      <section className='lg:w-1/2 h-screen bg-[#e4e3de] items-center justify-center lg:flex hidden'>
        {/* <img src={LoginImage} alt='' className='w-full h-full object-cover' /> */}
      </section>
    </div>
  )
}

const SocialLoginIcons = ({ icon: Icon }) => {
  return (
    <button className='rounded-md w-full hover:border-red-500 transition-all text-white p-3 border flex justify-center items-center'>
      <Icon />
    </button>
  )
}
