// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
  <BrowserRouter>
  <App />
</BrowserRouter>
</CartProvider>
</SearchProvider>
</AuthProvider>
  )
