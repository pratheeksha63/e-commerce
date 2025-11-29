// Import React, useEffect for loading data, and useState for component state
import React, { useEffect, useState } from 'react'
// Import Link for navigation
import { Link } from 'react-router-dom'

// Orders page component - displays all past orders
const Orders = () => {
  // State to store all orders loaded from localStorage
  const [orders, setOrders] = useState([])

  // Effect to load all orders from localStorage when component mounts
  useEffect(() => {
    // Get all orders from localStorage
    const savedOrders = localStorage.getItem('allOrders')
    // If orders exist, parse them and store in state
    if (savedOrders) {
      try {
        // Parse JSON string back into JavaScript array
        const parsedOrders = JSON.parse(savedOrders)
        // Validate that parsed orders is actually an array
        if (Array.isArray(parsedOrders)) {
          // Sort orders by date (newest first)
          const sortedOrders = parsedOrders.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
          })
          setOrders(sortedOrders)
        }
      } catch (error) {
        // If parsing fails, log error
        console.error('Error parsing orders data:', error)
      }
    }
  }, []) // Empty dependency array means this runs only once on mount

  // Format date to readable string
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate total items in an order
  const getTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    // Main container with full height
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Page header section */}
      <div className="mb-12 text-center">
        {/* Decorative top element */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent rounded-full"></div>
        </div>
        
        {/* Page heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800 relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
            My Orders
          </span>
          <span className="absolute -top-2 -right-4 text-3xl opacity-20 animate-pulse">📦</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-600 font-light max-w-xl mx-auto">
          View all your past orders and order details
        </p>
        
        {/* Decorative bottom element */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-0.5 bg-primary-300 rounded-full"></div>
            <span className="text-primary-400 text-xl">✨</span>
            <div className="w-12 h-0.5 bg-primary-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Orders list or empty state */}
      {orders.length === 0 ? (
        // Empty state when no orders exist
        <div className="text-center py-20">
          <div className="text-6xl mb-6 opacity-50">📭</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here!
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-full font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            <span>Browse Products</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        // Orders list
        <div className="space-y-6">
          {/* Map through orders and display each one */}
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Order header with gradient background */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order ID and date */}
                  <div>
                    <h3 className="text-xl font-bold mb-1">Order #{order.orderId}</h3>
                    <p className="text-primary-100 text-sm">
                      {formatDate(order.date)}
                    </p>
                  </div>
                  {/* Order total */}
                  <div className="text-right">
                    <p className="text-sm text-primary-100 mb-1">Total</p>
                    <p className="text-3xl font-bold">₹{order.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Order details */}
              <div className="p-6">
                {/* Items ordered section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <span className="mr-2">🛍️</span>
                    Items ({getTotalItems(order.items)})
                  </h4>
                  <div className="space-y-3">
                    {/* Map through items and display each one */}
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Product image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          {/* Product name and quantity */}
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {/* Item subtotal */}
                        <div className="text-right">
                          <p className="font-bold text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping information section */}
                {order.name && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <span className="mr-2">📍</span>
                      Shipping Information
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <span className="font-semibold">{order.name}</span>
                        <br />
                        {order.address}
                        <br />
                        {order.city}, {order.zipCode}
                        {order.email && (
                          <>
                            <br />
                            <span className="text-primary-600">{order.email}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* Delivery notes if available */}
                {order.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Delivery Notes</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                      {order.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to home link */}
      <div className="text-center mt-12">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}

// Export Orders as default export
export default Orders

