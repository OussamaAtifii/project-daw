import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { HeartIcon } from './Icons'
import { addLike, getLike, removeLike } from '../services/productsApi'
import { useDebouncedCallback } from 'use-debounce'

export default function LikeButton ({ productId }) {
  const [like, setLike] = useState(false)
  const { validateUser, logout, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const getUserLike = async () => {
      const isValid = await validateUser()

      if (!isValid) return logout()

      try {
        const data = await getLike(productId, user.userId)
        console.log(data)
        if (data.like) { return setLike(true) }
        setLike(false)
      } catch (error) {
        console.error('Error getting like:', error)
        setLike(false)
      }
    }

    getUserLike()
  }, [])

  const handleLike = useDebouncedCallback(async () => {
    const isValid = await validateUser()

    if (!isValid) {
      navigate('/login')
      return logout()
    }

    like ? removeLike(productId, user.userId) : addLike(productId, user.userId)

    setLike(!like)
  }, 300)

  return (
    <button
      onClick={handleLike}
      className='border border-main-200 text-white px-6 py-3 rounded-md mt-4 mr-4'
    >
      {like ? <HeartIcon fill='#D2042D' /> : <HeartIcon />}
    </button>
  )
}
