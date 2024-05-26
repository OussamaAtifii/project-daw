import { createContext, useState } from 'react'

// Crear contexto
export const CartContext = createContext()

// Crear provider
export function CartProvider ({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

  const addToCart = product => {
    const productIndex = cart.findIndex(item => item.id === product.id)

    if (productIndex >= 0) {
      // !TODO change structure clone
      const newCart = structuredClone(cart)
      newCart[productIndex].quantity += 1
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return
    }

    const newCart = [
      ...cart, {
        ...product,
        quantity: 1
      }
    ]

    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  const removePartial = product => {
    const productIndex = cart.findIndex(item => item.id === product.id)

    if (productIndex >= 0 && cart[productIndex].quantity > 1) {
      // !TODO change structure clone
      const newCart = structuredClone(cart)
      newCart[productIndex].quantity -= 1
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  }

  const clearCart = () => {
    setCart([])
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const removeFromCart = (product) => {
    const newCart = cart.filter(item => item.id !== product.id)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, removePartial, checkProductInCart }}>
      {children}
    </CartContext.Provider>
  )
}
