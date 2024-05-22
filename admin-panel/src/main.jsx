import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>

)
