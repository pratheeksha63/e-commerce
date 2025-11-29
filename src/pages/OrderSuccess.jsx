// Import React, useEffect for loading data, and useState for component state
import React, { useEffect, useState } from 'react'
// Import Link for navigation and useSearchParams to read URL query parameters
import { Link, useSearchParams } from 'react-router-dom'

// OrderSuccess page component - displays order confirmation after successful checkout
const OrderSuccess = () => {
  // Get URL search parameters to read order ID from URL (e.g., ?orderId=ORD-123456)
  const [searchParams] = useSearchParams()
  // Extract orderId from URL parameters
  const orderIdFromUrl = searchParams.get('orderId')
  // State to store order data loaded from localStorage
  const [orderData, setOrderData] = useState(null)

  // Effect to load order data from localStorage when component mounts
  useEffect(() => {
    // Try to get order data from localStorage (saved during checkout)
    const savedOrder = localStorage.getItem('lastOrder')
    // If order data exists, parse it and store in state
    if (savedOrder) {
      try {
        // Parse JSON string back into JavaScript object
        setOrderData(JSON.parse(savedOrder))
      } catch (error) {
        // If parsing fails, log error (data might be corrupted)
        console.error('Error parsing order data:', error)
      }
    }
  }, []) // Empty dependency array means this runs only once on mount

  // Get order ID from URL parameter, or from orderData, or default to 'N/A'
  const orderId = orderIdFromUrl || orderData?.orderId || 'N/A'
  // Get total price from orderData, or default to 0
  const total = orderData?.total || 0
  // Get items array from orderData, or default to empty array
  const items = orderData?.items || []

  return (
    // Main container with full height, centered content
    <div className="container mx-auto px-4 py-16 min-h-screen">
      {/* Inner container with max width and centered text */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Success message section */}
        <div className="mb-8">
          {/* Large checkmark emoji */}
          <div className="text-6xl mb-4">✅</div>
          {/* Main heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Confirmed!
          </h1>
          {/* Thank you message */}
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>

        {/* Order details card with white background and shadow */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-left">
          {/* Order information section */}
          <div className="mb-6">
            {/* Section heading */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Order Details
            </h2>
            {/* Order ID and date information */}
            <div className="space-y-2">
              {/* Order ID row */}
              <p className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">{orderId}</span>
              </p>
              {/* Order date row - only show if date exists in orderData */}
              {orderData?.date && (
                <p className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-semibold">
                    {/* Format date using browser's locale settings */}
                    {new Date(orderData.date).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Items ordered section - only show if items exist */}
          {items.length > 0 && (
            <div className="mb-6">
              {/* Section heading */}
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Items Ordered
              </h3>
              {/* List of ordered items */}
              <div className="space-y-2">
                {/* Map through items and display each one */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-600"
                  >
                    {/* Item name and quantity */}
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    {/* Item subtotal (price × quantity) */}
                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total price section with border separator */}
          <div className="border-t pt-4">
            {/* Total row */}
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total</span>
              {/* Total price in primary color */}
              <span className="text-primary-600">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping information section - only show if orderData exists */}
          {orderData && (
            <div className="mt-6 pt-6 border-t">
              {/* Section heading */}
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Shipping To
              </h3>
              {/* Shipping address information */}
              <p className="text-gray-600">
                {/* Customer name */}
                {orderData.name}
                {/* Line break */}
                <br />
                {/* Street address */}
                {orderData.address}
                {/* Line break */}
                <br />
                {/* City and ZIP code */}
                {orderData.city}, {orderData.zipCode}
                {/* Email - only show if exists */}
                {orderData.email && (
                  <>
                    {/* Line break */}
                    <br />
                    {/* Email address */}
                    {orderData.email}
                  </>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Action buttons section */}
        <div className="space-y-4">
          {/* Button to continue shopping */}
          <Link
            to="/products"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors mr-4"
          >
            Continue Shopping
          </Link>
          {/* Button to view all orders */}
          <Link
            to="/orders"
            className="inline-block bg-white border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            View All Orders
          </Link>
          {/* Line break */}
          <br />
          {/* Link to go back to home page */}
          <Link
            to="/"
            className="inline-block text-primary-600 hover:text-primary-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

// Export OrderSuccess as default export
export default OrderSuccess