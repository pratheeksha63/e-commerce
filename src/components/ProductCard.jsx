// Import React library
import React from 'react'
// Import Link component for navigation to product detail page
import { Link } from 'react-router-dom'
// Import useCart hook to access addToCart function
import { useCart } from '../context/CartContext'

// ProductCard component - displays a single product in a card layout
// product: the product object containing id, name, price, image, etc.
// onAddToCart: optional callback function called when item is added to cart
const ProductCard = ({ product, onAddToCart }) => {
  // Get addToCart function from cart context
  const { addToCart } = useCart()
  
  // Handler for image loading errors - sets a fallback placeholder
  const handleImageError = (e) => {
    // If image fails to load, set a placeholder image
    // Using a data URI for a simple placeholder, or you could use a local image
    e.target.src = `https://via.placeholder.com/500x500/f0f0f0/999999?text=${encodeURIComponent(product.name)}`
    // Alternatively, you could use: e.target.src = '/placeholder-image.jpg'
  }

  // Handler function for Add to Cart button click
  const handleAddToCart = (e) => {
    // Prevent default button behavior
    e.preventDefault()
    // Stop event from bubbling up to parent elements (like Link)
    e.stopPropagation()
    // Add product to cart with quantity of 1
    addToCart(product, 1)
    // If callback function provided, call it (for showing toast notifications)
    if (onAddToCart) {
      onAddToCart()
    }
  }

  return (
    // Card container with white background, rounded corners, shadow, and hover effect
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Link to product detail page - wraps only the image */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Image container with square aspect ratio and overflow hidden */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          {/* Product image with hover zoom effect */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      </Link>
      {/* Card content section with padding and flex layout */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Link to product detail page - wraps product name */}
        <Link to={`/product/${product.id}`}>
          {/* Product name with hover color change and line clamp (max 2 lines) */}
          <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        {/* Product price with primary color styling */}
        <p className="text-primary-600 font-bold text-xl mb-4">
          {/* Format price to 2 decimal places */}
          ₹{product.price.toFixed(2)}
        </p>
        {/* Add to Cart button - positioned at bottom using mt-auto */}
        <button
          onClick={handleAddToCart}
          type="button"
          className="mt-auto bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// Export ProductCard as default export
export default ProductCard