import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Shop from './components/Shop'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Checkout from './components/Checkout'
import './App.css'

function AppContent() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const navigate = useNavigate()

  const addToCart = (product) => {
    setCart([...cart, product])
    setIsCartOpen(true)
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const clearCart = () => setCart([])

  const handleCheckout = () => {
    setIsCartOpen(false)
    navigate('/checkout')
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          <div className="bg-black min-h-screen text-white flex flex-col">
            <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
            <Hero />
            <div className="flex-grow bg-white">
              <Features />
              <Shop addToCart={addToCart} />
              <Services />
              <Testimonials />
              <About />
              <Contact />
            </div>
            <Footer />
          </div>
        } />
        <Route path="/checkout" element={
          <Checkout cart={cart} clearCart={clearCart} />
        } />
      </Routes>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
