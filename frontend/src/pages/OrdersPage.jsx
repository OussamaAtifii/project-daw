import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatDate } from '../utils/utils'

function OrderPage () {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user) {
      logout()
      navigate('/login')
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
      <div className='max-w-screen-xl mx-auto'>
        <h1 className='text-3xl font-semibold'>Historial de Pedidos</h1>
        <p className='text-gray-600 mb-10'>
          Aquí podrás ver todos tus pedidos realizados en la tienda.
        </p>

        <p>Filtrar por:</p>
        <div className='grid grid-cols-4 justify-between gap-10 mb-10'>
          <button className='hover:bg-gray-100 p-4 rounded-md border-2' onClick={orderLatest}>
            Mas recientes
          </button>
          <button className='hover:bg-gray-100 p-4 rounded-md border-2' onClick={orderOldest}>
            Mas antiguos
          </button>
          <button className='hover:bg-gray-100 p-4 rounded-md border-2' onClick={orderPrice}>
            Precio
          </button>
          <button className='hover:bg-gray-100 p-4 rounded-md border-2'>
            Mas recientes
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orders.map((order) => (
            <div key={order.id} className='border rounded-lg p-4 shadow-md'>
              <div className='flex justify-between mb-2'>
                <h2 className='text-lg font-semibold'>Pedido #{order.id}</h2>
                <p className='text-gray-500'>
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <ul>
                {order.products.map((item) => (
                  <li key={item.id} className='flex justify-between mb-2'>
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
              <div className='mt-4'>
                <p className='text-gray-500'>
                  Cantidad de productos: {order.products.length}
                </p>
                <p className='text-gray-500'>Total: ${order.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderPage
