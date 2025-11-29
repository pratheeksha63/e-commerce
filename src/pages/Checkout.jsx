// Import React and useState hook for form state management
import React, { useState } from 'react'
// Import useNavigate for programmatic navigation after form submission
import { useNavigate } from 'react-router-dom'
// Import useCart hook to access cart and checkout functions
import { useCart } from '../context/CartContext'

// Checkout page component - form to collect shipping information and place order
const Checkout = () => {
  // Get navigate function for programmatic navigation
  const navigate = useNavigate()
  // Get cart array, getCartTotal function, and clearCart function from context
  const { cart, getCartTotal, clearCart } = useCart()
  // Calculate total price of all items in cart
  const total = getCartTotal()

  // State to store form input values
  const [formData, setFormData] = useState({
    name: '', // Customer's full name
    email: '', // Customer's email address
    address: '', // Street address
    city: '', // City name
    zipCode: '', // ZIP/postal code
    notes: '', // Optional delivery notes
  })

  // State to store validation errors for each form field
  const [errors, setErrors] = useState({})

  // If cart is empty, don't allow checkout - redirect user
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        {/* Button to go back to products page */}
        <button
          onClick={() => navigate('/products')}
          className="text-primary-600 hover:text-primary-700"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  // Function to validate all form fields
  const validateForm = () => {
    // Object to store any validation errors
    const newErrors = {}
    
    // Validate name field - must not be empty (after trimming whitespace)
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    // Validate email field
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Check if email matches basic email format (has @ and domain)
      newErrors.email = 'Email is invalid'
    }
    // Validate address field
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    // Validate city field
    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }
    // Validate ZIP code field
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required'
    }

    // Update errors state with any validation errors found
    setErrors(newErrors)
    // Return true if no errors (form is valid), false otherwise
    return Object.keys(newErrors).length === 0
  }

  // Handler function for form submission
  const handleSubmit = (e) => {
    // Prevent default form submission (page reload)
    e.preventDefault()
    
    // Validate form before proceeding
    if (validateForm()) {
      // Generate unique order ID using current timestamp
      const orderId = `ORD-${Date.now()}`
      // Create order data object with all form data, cart items, total, and timestamp
      const orderData = {
        orderId, // Unique order identifier
        ...formData, // Spread all form fields (name, email, address, etc.)
        items: cart, // All items in cart
        total, // Total price
        date: new Date().toISOString(), // Current date/time in ISO format
      }
      
      // Save order data to localStorage (in a real app, this would be sent to a server)
      // Save as lastOrder for backward compatibility
      localStorage.setItem('lastOrder', JSON.stringify(orderData))
      
      // Also save to allOrders array to keep history
      const existingOrders = localStorage.getItem('allOrders')
      let allOrders = []
      if (existingOrders) {
        try {
          allOrders = JSON.parse(existingOrders)
          if (!Array.isArray(allOrders)) {
            allOrders = []
          }
        } catch (error) {
          console.error('Error parsing existing orders:', error)
          allOrders = []
        }
      }
      // Add new order to the array
      allOrders.push(orderData)
      // Save updated orders array back to localStorage
      localStorage.setItem('allOrders', JSON.stringify(allOrders))
      // Clear the cart after successful order
      clearCart()
      // Navigate to order success page with order ID as URL parameter
      navigate(`/order-success?orderId=${orderId}`)
    }
  }

  // Handler function for input field changes
  const handleChange = (e) => {
    // Get the input name and value from the event target
    const { name, value } = e.target
    // Update formData state with new value for the changed field
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing (for better UX)
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    // Main container with full height
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Page heading */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      {/* Grid layout: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form Section - takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          {/* Form with white background, padding, rounded corners, and shadow */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Form section heading */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Shipping Information
            </h2>

            {/* Full Name input field */}
            <div>
              {/* Label for name field */}
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Full Name *
              </label>
              {/* Name input - red border if there's an error */}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {/* Error message displayed below input if validation fails */}
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Address input field */}
            <div>
              {/* Label for email field */}
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address *
              </label>
              {/* Email input with type="email" for browser validation */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
              {/* Error message for email validation */}
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Street Address input field */}
            <div>
              {/* Label for address field */}
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Street Address *
              </label>
              {/* Address input */}
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123 Main Street"
              />
              {/* Error message for address validation */}
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* City and ZIP Code - side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City input field */}
              <div>
                {/* Label for city field */}
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  City *
                </label>
                {/* City input */}
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="New York"
                />
                {/* Error message for city validation */}
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* ZIP Code input field */}
              <div>
                {/* Label for ZIP code field */}
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  ZIP Code *
                </label>
                {/* ZIP code input */}
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="10001"
                />
                {/* Error message for ZIP code validation */}
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>

            {/* Delivery Notes textarea - optional field */}
            <div>
              {/* Label for notes field */}
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Delivery Notes (Optional)
              </label>
              {/* Textarea for multi-line notes input */}
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Any special delivery instructions..."
              />
            </div>

            {/* Submit button - full width */}
            <button
              type="submit"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary Section - takes 1 column on desktop, sticky positioning */}
        <div className="lg:col-span-1">
          {/* Summary card with sticky positioning (stays visible when scrolling) */}
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
            {/* Section heading */}
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            {/* List of cart items */}
            <div className="space-y-2 mb-4">
              {/* Map through cart items and display name, quantity, and price */}
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  {/* Item name and quantity */}
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  {/* Item subtotal (price × quantity) */}
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            {/* Total price section with border separator */}
            <div className="border-t pt-4">
              {/* Total row */}
              <div className="flex justify-between text-xl font-bold text-gray-800 mb-4">
                <span>Total</span>
                {/* Total price in primary color */}
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
              {/* Disclaimer that this is a demo checkout */}
              <p className="text-sm text-gray-500">
                * This is a demo checkout. No real payment will be processed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export Checkout as default export
export default Checkout