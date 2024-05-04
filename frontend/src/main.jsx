import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import { CartProvider } from './context/cart.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext.jsx'
import OrdersPage from './pages/OrdersPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/categories/:categoryId',
    element: <CategoryPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/checkout',
    element: <CheckoutPage />
  },
  {
    path: '/orders',
    element: <OrdersPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <AuthProvider>
      <Toaster richColors />
      <RouterProvider router={router} />
    </AuthProvider>
  </CartProvider>
)
