import { useMemo } from 'react'
import CheckoutProductCard from '../components/CheckoutProductCard'
import Navbar from '../components/Navbar'
import { useCart } from '../hooks/useCart'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { RemoveCartIcon } from '../components/Icons'
import Breadcrumbs from '../components/Breadcrumbs'

export default function CartPage () {
  const { cart } = useCart()
  const location = useLocation()

  const subtotal = useMemo(() => {
    const totalPrice = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    return totalPrice.toFixed(2)
  }, [cart])

  return (
    <>
      {
    location.pathname === '/cart'
      ? (
        <>
          <Navbar />
          <Breadcrumbs />
          {cart.length > 0
            ? (
              <div className='max-w-screen-xl mx-auto sm:flex gap-4'>
                <section className='w-full'>
                  {/* Lista de productos en el carrito */}
                  <div className='flex flex-col gap-2 px-2 lg:p-0'>
                    {cart.map((product) => (
                      <CheckoutProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
                <section>
                  {/* Resumen del carrito */}
                  <div className='border border-gray-200 sm:rounded-lg overflow-hidden shadow-sm fixed bottom-0 sm:static bg-white p-4 w-full sm:w-[300px] md:w-[400px] mx-auto divide-y-2'>
                    {/* Detalles del precio */}
                    <div className='text-sm hidden sm:flex justify-between py-3'>
                      <div>
                        <p>Subtotal:</p>
                        <p>Envío:</p>
                      </div>
                      <div className='text-right'>
                        <p>{subtotal}€</p>
                        <p>0.00€</p>
                      </div>
                    </div>
                    {/* Total */}
                    <div className='flex justify-between py-3'>
                      <p>Total:</p>
                      <p>{subtotal}€</p>
                    </div>
                    {/* Botón de realizar pedido */}
                    <div className='pt-6'>
                      <Link to='/cart/checkout'>
                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full'>
                          Realizar pedido
                        </button>
                      </Link>
                    </div>
                  </div>
                </section>
              </div>
              )
            : (
              <div className='flex flex-col items-center gap-4'>
                <div className='bg-main-200 rounded-full p-4 '>
                  <RemoveCartIcon />
                </div>
                <p>
                  Tu carrito está vacío.{' '}
                  <Link to='/' className='text-main-600 italic hover:underline'>
                    ¡Explora nuestros productos!
                  </Link>
                </p>
              </div>
              )}
        </>
        )
      : (
        <Outlet />
        )
  }
    </>
  )
}
