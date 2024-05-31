import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatDate } from '../utils/utils'
import Breadcrumbs from '../components/Breadcrumbs'
import { CreditCardNotAccept } from '../components/Icons'

function OrderPage () {
  const { user, logout, validateUser } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getUserOrders = async () => {
      const isValid = await validateUser()

      if (!isValid) {
        logout()
        navigate('/login')
        return
      }

      fetch(`http://localhost:3000/orders/${user.userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setOrders(data)
        })
    }

    getUserOrders()
  }, [])

  const orderLatest = () => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    setOrders(sortedOrders)
  }

  const orderOldest = () => {
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )
    setOrders(sortedOrders)
  }

  const orderPrice = () => {
    const sortedOrders = [...orders].sort((a, b) => b.total - a.total)
    setOrders(sortedOrders)
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className='max-w-screen-xl mx-auto px-2 2xl:px-0'>
        {orders.length > 0
          ? (
            <>
              <h1 className='text-3xl font-semibold'>Historial de Pedidos</h1>
              <p className='text-gray-600 mb-10 hidden sm:block'>
                Aquí podrás ver todos tus pedidos realizados en la tienda.
              </p>
              <div className='flex flex-wrap justify-between gap-4 mb-10'>
                <button
                  className='flex-1 min-w-[150px] hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderLatest}
                >
                  Mas recientes
                </button>
                <button
                  className='flex-1 min-w-[150px] hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderOldest}
                >
                  Mas antiguos
                </button>
                <button
                  className='flex-1 min-w-[150px] hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderPrice}
                >
                  Precio
                </button>
                <button className='flex-1 min-w-[150px] hover:bg-gray-100 p-4 rounded-md border-2'>
                  Mas recientes
                </button>
              </div>
              <hr className='border-gray-300 mb-10' />
              <div
                className='grid gap-6 mx-auto'
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
                }}
              >
                {orders.map((order) => (
                  <div key={order.id} className='border rounded-lg p-4 shadow-md'>
                    <div className='flex justify-between mb-2'>
                      <h2 className='text-lg font-semibold'>
                        Pedido #{order.id}
                      </h2>
                      <p className='text-gray-500'>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className='mt-4'>
                      <p className='text-gray-500'>
                        Cantidad de productos: {order.products.length}
                      </p>
                      <p className='text-gray-500'>
                        Total: {order.total.toFixed(2)}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
            )
          : (
            <div className='flex flex-col items-center gap-4 text-center'>
              <div className='bg-main-200 rounded-full p-4 '>
                <CreditCardNotAccept />
              </div>
              <p>
                Aún no has realizado ningún pedido.{' '}
                <Link to='/' className='text-main-600 italic hover:underline'>
                  ¡Explora nuestros productos!
                </Link>
              </p>
            </div>
            )}
      </div>
    </>
  )
}

export default OrderPage
