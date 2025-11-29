// Import React library
import React from 'react'
// Import React Router components for client-side routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Import CartProvider to wrap the app and provide cart state globally
import { CartProvider } from './context/CartContext'
// Import layout components
import Header from './components/Header'
import Footer from './components/Footer'
// Import all page components for routing
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import About from './pages/About'

// Main App component that sets up routing and layout structure
function App() {
  return (
    // CartProvider wraps everything to provide cart state to all components
    <CartProvider>
      {/* Router enables client-side routing (no page refreshes) */}
      <Router>
        {/* Main container with flexbox layout (full height with flex-col) */}
        <div className="flex flex-col min-h-screen">
          {/* Header component with navigation, search, and cart icon - appears on all pages */}
          <Header />
          {/* Main content area that grows to fill available space */}
          <main className="flex-grow">
            {/* Routes define which component to render for each URL path */}
            <Routes>
              {/* Home page route - root URL */}
              <Route path="/" element={<Home />} />
              {/* Products listing page with filters and search */}
              <Route path="/products" element={<Products />} />
              {/* About page */}
              <Route path="/about" element={<About />} />
              {/* Product detail page - :id is a dynamic parameter */}
              <Route path="/product/:id" element={<ProductDetail />} />
              {/* Shopping cart page */}
              <Route path="/cart" element={<Cart />} />
              {/* Checkout form page */}
              <Route path="/checkout" element={<Checkout />} />
              {/* Order confirmation page after successful checkout */}
              <Route path="/order-success" element={<OrderSuccess />} />
              {/* Orders page to view all past orders */}
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
          {/* Footer component - appears on all pages */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

// Export App as the default export so it can be imported in main.jsx
export default App