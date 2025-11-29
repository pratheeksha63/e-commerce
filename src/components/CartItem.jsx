// Import React library
import React from 'react'
// Import Link component for navigation to product detail page
import { Link } from 'react-router-dom'
// Import useCart hook to access cart functions
import { useCart } from '../context/CartContext'

// CartItem component - displays a single item in the shopping cart
// item: the cart item object containing product info and quantity
const CartItem = ({ item }) => {
  // Get updateQuantity and removeFromCart functions from cart context
  const { updateQuantity, removeFromCart } = useCart()
  
  // Handler for image loading errors - sets a fallback placeholder
  const handleImageError = (e) => {
    // If image fails to load, set a placeholder image
    e.target.src = `https://via.placeholder.com/200x200/f0f0f0/999999?text=${encodeURIComponent(item.name)}`
  }

  return (
    // Cart item container with flex layout, white background, padding, and shadow
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      {/* Link to product detail page - wraps product image */}
      <Link to={`/product/${item.id}`} className="flex-shrink-0">
        {/* Product thumbnail image - square with rounded corners */}
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
          onError={handleImageError}
          loading="lazy"
        />
      </Link>
      
      {/* Product info section - takes remaining space with flex-grow */}
      <div className="flex-grow min-w-0">
        {/* Link to product detail page - wraps product name */}
        <Link
          to={`/product/${item.id}`}
          className="font-semibold text-gray-800 hover:text-primary-600 transition-colors block mb-1"
        >
          {/* Product name */}
          {item.name}
        </Link>
        {/* Product price per unit */}
        <p className="text-primary-600 font-bold">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls section */}
      <div className="flex items-center space-x-2">
        {/* Decrease quantity button */}
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          aria-label="Decrease quantity"
        >
          {/* Minus symbol */}
          −
        </button>
        {/* Current quantity display */}
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        {/* Increase quantity button */}
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          aria-label="Increase quantity"
        >
          {/* Plus symbol */}
          +
        </button>
      </div>

      {/* Price and remove section - aligned to right */}
      <div className="text-right min-w-[80px]">
        {/* Total price for this item (price * quantity) */}
        <p className="font-bold text-gray-800">
          {/* Calculate and format total: item price times quantity */}
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        {/* Remove item button with red styling */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 text-sm mt-1"
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

// Export CartItem as default export
export default CartItem