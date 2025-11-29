// Import React library and useState hook for component state
import React, { useState } from 'react'
// Import Link for navigation and useNavigate for programmatic navigation
import { Link, useNavigate } from 'react-router-dom'
// Import useCart hook to access cart context and get item count
import { useCart } from '../context/CartContext'

// Header component - appears at the top of every page
const Header = () => {
  // State to store the search input value
  const [searchQuery, setSearchQuery] = useState('')
  // State to track if mobile menu is open/closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Get getCartItemCount function from cart context to show badge
  const { getCartItemCount } = useCart()
  // Get navigate function for programmatic navigation
  const navigate = useNavigate()
  // Calculate total number of items in cart for badge display
  const cartItemCount = getCartItemCount()

  // Handler function for search form submission
  const handleSearch = (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault()
    // Only navigate if search query is not empty (after trimming whitespace)
    if (searchQuery.trim()) {
      // Navigate to products page with search query as URL parameter
      // encodeURIComponent ensures special characters are properly encoded
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      // Clear search input after submission
      setSearchQuery('')
    }
  }

  return (
    // Header element with white background, shadow, sticky positioning, and high z-index
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Container with max width, centered, and horizontal padding */}
      <div className="container mx-auto px-4">
        {/* Flex container with items centered vertically and spaced between */}
        <div className="flex items-center justify-between h-16">
          {/* Logo section - clickable link to home page */}
          {/* Logo + shop name */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Floral studio.jpg"        // put your logo in public/ folder
              alt="Logo"
              className="w-8 h-8 object-cover"
            />
            <span className="text-xl font-bold text-gray-800 hidden sm:inline">
              Bloom & Blossom
            </span>
          </Link>

          {/* Desktop Navigation - hidden on mobile, visible from md breakpoint */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Home link */}
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            {/* Products link */}
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Products
            </Link>
            {/* About link */}
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            {/* Orders link */}
            <Link
              to="/orders"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Orders
            </Link>
          </nav>

          {/* Right side: Search form and Cart icon */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search Form - hidden on mobile, visible from sm breakpoint */}
            <form onSubmit={handleSearch} className="hidden sm:flex">
              {/* Relative container for search input and icon positioning */}
              <div className="relative">
                {/* Search input field */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flowers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 w-64"
                />
                {/* Search icon button - absolutely positioned inside input */}
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
                >
                  🔍
                </button>
              </div>
            </form>

            {/* Cart Icon Link - clickable to go to cart page */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {/* Shopping cart emoji */}
              <span className="text-2xl">🛒</span>
              {/* Badge showing item count - only shows if count > 0 */}
              {/* Badge positioned at top-right of cart icon */}
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {/* Show "9+" if count exceeds 9, otherwise show actual count */}
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle Button - only visible on mobile (hidden from md breakpoint) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {/* Show X icon if menu is open, hamburger icon if closed */}
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu - conditionally rendered when isMobileMenuOpen is true */}
        {/* Mobile menu container - hidden on desktop, visible on mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {/* Navigation links in vertical column layout */}
            <nav className="flex flex-col space-y-3">
              {/* Home link in mobile menu */}
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {/* Products link in mobile menu */}
              <Link
                to="/products"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              {/* About link in mobile menu */}
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {/* Orders link in mobile menu */}
              <Link
                to="/orders"
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
              {/* Mobile search form */}
              <form onSubmit={handleSearch} className="mt-3">
                {/* Relative container for search input and icon */}
                <div className="relative">
                  {/* Full-width search input for mobile */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search flowers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  {/* Search icon button */}
                  <button
                    type="submit"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    🔍
                  </button>
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

// Export Header as default export
export default Header