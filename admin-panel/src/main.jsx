import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateCategory from './categories/UpdateCategory.jsx'
import CreateCategory from './categories/CreateCategory.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import CreateBrand from './brands/CreateBrand.jsx'
import UpdateBrand from './brands/UpdateBrand.jsx'
import UpdateUser from './users/UpdateUser.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/category/create',
    element: <CreateCategory />
  },
  {
    path: '/update-category/:id',
    element: <UpdateCategory />
  },
  {
    path: '/brand/create',
    element: <CreateBrand />
  },
  {
    path: '/update-brand/:id',
    element: <UpdateBrand />
  },
  {
    path: '/update-user/:id',
    element: <UpdateUser />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>
)
