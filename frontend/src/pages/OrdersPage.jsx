import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatDate } from '../utils/utils'
import Breadcrumbs from '../components/Breadcrumbs'
import { CreditCardNotAccept } from '../components/Icons'

function OrderPage () {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user) {
      logout()
      return navigate('/login')
    }

    fetch(`http://localhost:3000/orders/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setOrders(data)
      })
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
    const sortedOrders = [...orders].sort((a, b) => b.price - a.price)
    setOrders(sortedOrders)
  }

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className='max-w-screen-xl mx-auto'>
        {orders.length > 0
          ? (
            <>
              <h1 className='text-3xl font-semibold'>Historial de Pedidos</h1>
              <p className='text-gray-600 mb-10'>
                Aquí podrás ver todos tus pedidos realizados en la tienda.
              </p>
              <p>Filtrar por:</p>
              <div className='grid grid-cols-4 justify-between gap-10 mb-10'>
                <button
                  className='hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderLatest}
                >
                  Mas recientes
                </button>
                <button
                  className='hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderOldest}
                >
                  Mas antiguos
                </button>
                <button
                  className='hover:bg-gray-100 p-4 rounded-md border-2'
                  onClick={orderPrice}
                >
                  Precio
                </button>
                <button className='hover:bg-gray-100 p-4 rounded-md border-2'>
                  Mas recientes
                </button>
              </div>
              <div
                className='grid gap-6 mx-auto'
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
                }}
              >
                {orders.map((order, index) => (
                  <div key={order.id} className='border rounded-lg p-4 shadow-md'>
                    <div className='flex justify-between mb-2'>
                      <h2 className='text-lg font-semibold'>
                        Pedido #{index + 1}
                      </h2>
                      <p className='text-gray-500'>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className='mt-4'>
                      <p className='text-gray-500'>
                        Cantidad de productos: {order.products.length}
                      </p>
                      <p className='text-gray-500'>Total: ${order.total}</p>
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
