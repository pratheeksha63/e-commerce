// Import React library
import React from 'react'
// Import Link component for navigation
import { Link } from 'react-router-dom'
// Import useCart hook to access cart state and functions
import { useCart } from '../context/CartContext'
// Import CartItem component to display individual cart items
import CartItem from '../components/CartItem'

// Cart page component - displays shopping cart contents
const Cart = () => {
  // Get cart array and getCartTotal function from cart context
  const { cart, getCartTotal } = useCart()
  // Calculate total price of all items in cart
  const total = getCartTotal()

  // If cart is empty, show empty cart message
  if (cart.length === 0) {
    return (
      // Container with full height
      <div className="container mx-auto px-4 py-16 min-h-screen">
        {/* Page heading */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
        {/* Empty cart message container */}
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          {/* Empty cart message */}
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          {/* Link to browse products */}
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    // Main container with full height
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Page heading */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      {/* Grid layout: 1 column on mobile, 3 columns on desktop (lg breakpoint) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section - takes 2 columns on desktop */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map through cart items and render CartItem for each */}
          {cart.map((item) => (
            // CartItem component - key prop required for React lists
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary Section - takes 1 column on desktop, sticky positioning */}
        <div className="lg:col-span-1">
          {/* Summary card with sticky positioning (stays visible when scrolling) */}
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            {/* Section heading */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            {/* Price breakdown section */}
            <div className="space-y-3 mb-6">
              {/* Subtotal row */}
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                {/* Format total to 2 decimal places */}
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              {/* Shipping row - always shows "Free" */}
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              {/* Total row with border separator */}
              <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                {/* Total price in primary color */}
                <span className="text-primary-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
            {/* Link to checkout page - full width button */}
            <Link
              to="/checkout"
              className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
            {/* Link to continue shopping */}
            <Link
              to="/products"
              className="block w-full text-center mt-3 text-primary-600 hover:text-primary-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export Cart as default export
export default Cart