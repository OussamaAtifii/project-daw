import { createContext, useState } from 'react'

// Crear contexto
export const CartContext = createContext()

// Crear provider
export function CartProvider ({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = product => {
    const productIndex = cart.findIndex(item => item.id === product.id)

    if (productIndex >= 0) {
      // !TODO change structure clone
      const newCart = structuredClone(cart)
      newCart[productIndex].quantity += 1
      return setCart(newCart)
    }

    setCart(prevState => ([
      ...prevState,
      {
        ...product,
        quantity: 1
      }
    ]))
  }

  const removePartial = product => {
    const productIndex = cart.findIndex(item => item.id === product.id)

    if (productIndex >= 0 && cart[productIndex].quantity > 1) {
      // !TODO change structure clone
      const newCart = structuredClone(cart)
      newCart[productIndex].quantity -= 1
      return setCart(newCart)
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const removeFromCart = (product) => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, removePartial }}>
      {children}
    </CartContext.Provider>
  )
}
