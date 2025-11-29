// Import React and useState hook for component state
import React, { useState } from 'react'
// Import useParams to get URL parameters (like product id) and useNavigate for navigation
import { useParams, useNavigate } from 'react-router-dom'
// Import useCart hook to access addToCart function
import { useCart } from '../context/CartContext'
// Import products data from JSON file
import productsData from '../data/products.json'
// Import Toast component for success notifications
import Toast from '../components/Toast'

// ProductDetail page component - shows detailed view of a single product
const ProductDetail = () => {
  // Get the product id from URL parameters (e.g., /product/1 -> id = "1")
  const { id } = useParams()
  // Get navigate function for programmatic navigation
  const navigate = useNavigate()
  // Get addToCart function from cart context
  const { addToCart } = useCart()
  // State for quantity selector (default: 1)
  const [quantity, setQuantity] = useState(1)
  // State to control toast visibility
  const [showToast, setShowToast] = useState(false)

  // Find the product in the products array that matches the URL id
  // parseInt converts string id to number for comparison
  const product = productsData.find((p) => p.id === parseInt(id))

  // If product not found (invalid id), show error message
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        {/* Button to go back to products page */}
        <button
          onClick={() => navigate('/products')}
          className="text-primary-600 hover:text-primary-700"
        >
          Back to Products
        </button>
      </div>
    )
  }

  // Handler function for Add to Cart button
  const handleAddToCart = () => {
    // Add product to cart with selected quantity
    addToCart(product, quantity)
    // Show success toast notification
    setShowToast(true)
    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000)
  }

  // Handler function to decrease quantity
  const decreaseQuantity = () => {
    // Only decrease if quantity is greater than 1 (minimum is 1)
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Handler function to increase quantity
  const increaseQuantity = () => {
    // Increase quantity by 1 (no maximum limit in this implementation)
    setQuantity(quantity + 1)
  }

  // Handler for image loading errors - sets a fallback placeholder
  const handleImageError = (e) => {
    // If image fails to load, set a placeholder image with product name
    e.target.src = `https://via.placeholder.com/500x500/f0f0f0/999999?text=${encodeURIComponent(product.name)}`
  }

  return (
    // Main container with full height
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Back button - navigates to previous page */}
      <button
        onClick={() => navigate(-1)}
        className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
      >
        ← Back
      </button>

      {/* Product details grid - 1 column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Product image with square aspect ratio */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover aspect-square"
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        {/* Product Information Section */}
        <div className="space-y-6">
          {/* Product name and price */}
          <div>
            {/* Product name - larger on desktop */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            {/* Product price in primary color */}
            <p className="text-3xl font-bold text-primary-600 mb-6">
              {/* Format price to 2 decimal places */}
              ₹{product.price.toFixed(2)}
            </p>
          </div>

          {/* Product description */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              Description
            </h2>
            {/* Product description text */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Product metadata (category and stock status) */}
          <div>
            {/* Product category */}
            <p className="text-sm text-gray-500 mb-2">
              Category: <span className="capitalize">{product.category}</span>
            </p>
            {/* Stock status - green if in stock, red if out of stock */}
            <p
              className={`text-sm font-semibold ${
                product.inStock ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {/* Show checkmark if in stock, X if out of stock */}
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </p>
          </div>

          {/* Quantity Selector and Add to Cart - only show if product is in stock */}
          {product.inStock && (
            <div className="space-y-4">
              {/* Quantity selector */}
              <div>
                {/* Quantity label */}
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Quantity
                </label>
                {/* Quantity controls - decrease, display, increase */}
                <div className="flex items-center space-x-4">
                  {/* Decrease button */}
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-bold"
                  >
                    {/* Minus symbol */}
                    −
                  </button>
                  {/* Current quantity display */}
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  {/* Increase button */}
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-bold"
                  >
                    {/* Plus symbol */}
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart button - full width */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast notification - conditionally rendered when showToast is true */}
      {showToast && (
        <Toast
          message="Item added to cart!"
          onClose={() => setShowToast(false)}
          type="success"
        />
      )}
    </div>
  )
}

// Export ProductDetail as default export
export default ProductDetail