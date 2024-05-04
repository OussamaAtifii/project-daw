import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../hooks/useCart'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { SpinnerIcon } from './Icons'
import { useAuth } from '../hooks/useAuth'

const PaymentComponent = () => {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const totalQty = cart.reduce((acc, product) => acc + product.quantity, 0)

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (totalQty === 0 || !stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    setIsProcessing(true)

    try {
      const res = await fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
      })
      const data = await res.json()
      const { client_secret: clientSecret } = data

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      })

      if (!paymentIntent) {
        setPaymentStatus('Payment failed')
        setIsProcessing(false)
        toast.error('Error al realizar el pago', { position: 'top-right' })
        return
      }

      setPaymentStatus('succeeded')

      // Manejo de la orden
      try {
        const body = { userId: user.userId, cart }
        console.log(body)
        const order = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const orderData = await order.json()
        console.log(orderData)
      } catch (error) {
        setPaymentStatus('Payment failed')
        setIsProcessing(false)
        console.log(error)
        return
      }

      clearCart()
      navigate('/')
      toast.success('Pago realizado correctamente', { position: 'top-center' })
    } catch (error) {
      console.error(error)
      setPaymentStatus('Payment failed')
      toast.error('Ocurrió un error al realizar el pago', { position: 'top-right' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='text-lg font-semibold mb-4'>Dirección de envío</h2>
        <div className='grid grid-cols-2 gap-4'>
          <input
            type='text'
            name='fullName'
            placeholder='Nombre completo'
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <input
            type='text'
            name='address'
            placeholder='Dirección'
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <input
            type='text'
            name='city'
            placeholder='Ciudad'
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
          <input
            type='text'
            name='postalCode'
            placeholder='Código postal'
            className='border border-gray-300 rounded px-3 py-2'
            required
          />
        </div>

        <h2 className='text-lg font-semibold mt-6 mb-4'>Información de pago</h2>
        <label htmlFor='card-element' />
        <CardElement id='card-element' />
        <button
          type='submit'
          disabled={!stripe || totalQty <= 0}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6'
        >
          {isProcessing ? <SpinnerIcon /> : 'Realizar pago'}
        </button>

        {!isProcessing && paymentStatus && <p>{paymentStatus}</p>}
      </form>
    </div>
  )
}

export default function PaymentGateway () {
  // TODO: Cambiar la clave pública por la clave privada
  const stripePromise = loadStripe(
    'pk_test_51PAwaDLEEJid0hQvSC0h1ocpz5CMKpLC237a75wVRFeSUluj7P7YqxyKBKSayHZXKBXtMSOSAjdoLokyAYNZJ1qJ00e8nb8OpD'
  )

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  )
}
