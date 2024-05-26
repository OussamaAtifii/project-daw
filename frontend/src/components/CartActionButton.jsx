import { useCart } from '../hooks/useCart'
import { AddCartIcon, RemoveCartIcon } from './Icons'

const CartActionButton = ({ product }) => {
  const { checkProductInCart, addToCart, removeFromCart } = useCart()
  const isInCart = checkProductInCart(product)

  return (
    <button
      className={`${
        isInCart
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-main-500 hover:bg-blue-600'
      } text-white rounded-md py-2 px-4 transition-colors`}
      onClick={() => (isInCart ? removeFromCart(product) : addToCart(product))}
    >
      {isInCart ? <RemoveCartIcon /> : <AddCartIcon />}
    </button>
  )
}

export default CartActionButton
