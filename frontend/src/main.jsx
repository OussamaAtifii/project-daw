import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)