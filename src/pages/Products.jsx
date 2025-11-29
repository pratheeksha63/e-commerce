// Import React hooks for state management and effects
import React, { useState, useEffect, useMemo } from 'react'
// Import useSearchParams to read URL query parameters (like ?search=flowers)
import { useSearchParams } from 'react-router-dom'
// Import ProductCard component to display individual products
import ProductCard from '../components/ProductCard'
// Import Toast component for success notifications
import Toast from '../components/Toast'
// Import products data from JSON file (mock backend)
import productsData from '../data/products.json'

// Products page component - displays all products with filtering and sorting
const Products = () => {
  // Get URL search parameters to read initial search query from URL
  const [searchParams] = useSearchParams()
  // Get 'search' parameter from URL, default to empty string if not present
  const initialSearch = searchParams.get('search') || ''
  
  // State for search input value
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  // State for selected category filter (default: 'all' shows everything)
  const [selectedCategory, setSelectedCategory] = useState('all')
  // State for sort option (default: 'name' sorts alphabetically)
  const [sortBy, setSortBy] = useState('name')
  // State for toast notification message (null = no toast shown)
  const [toastMessage, setToastMessage] = useState(null)

  // Extract unique categories from products data and add 'all' option
  // Set removes duplicates, spread operator converts Set back to array
  const categories = ['all', ...new Set(productsData.map((p) => p.category))]

  // Memoized computation of filtered and sorted products
  // Only recalculates when searchQuery, selectedCategory, or sortBy changes
  const filteredAndSortedProducts = useMemo(() => {
    // Filter products based on search query and category
    let filtered = productsData.filter((product) => {
      // Check if product name or description contains search query (case-insensitive)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      // Check if product matches selected category (or 'all' is selected)
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory
      // Product must match both search AND category filters
      return matchesSearch && matchesCategory
    })

    // Sort the filtered products based on selected sort option
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          // Sort by price ascending (lowest first)
          return a.price - b.price
        case 'price-high':
          // Sort by price descending (highest first)
          return b.price - a.price
        case 'name':
        default:
          // Sort alphabetically by name (default)
          return a.name.localeCompare(b.name)
      }
    })

    // Return the filtered and sorted products array
    return filtered
  }, [searchQuery, selectedCategory, sortBy]) // Dependencies: recalculate when these change

  // Effect to sync search query with URL parameter on mount or URL change
  useEffect(() => {
    // If URL has a search parameter, update the search query state
    if (initialSearch) {
      setSearchQuery(initialSearch)
    }
  }, [initialSearch]) // Re-run when initialSearch changes (URL parameter changes)

  // Handler function called when item is added to cart (from ProductCard)
  const handleShowToast = () => {
    // Set toast message to show success notification
    setToastMessage('Item added to cart!')
    // Clear toast after 3 seconds
    setTimeout(() => setToastMessage(null), 3000)
  }

  return (
    // Main container with full height
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Page heading */}
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Our Products
      </h1>

      {/* Filters and Search Section */}
      <div className="mb-8 space-y-4">
        {/* Search and filter controls - stacked on mobile, row on desktop */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search input field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for flowers..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />

          {/* Category Filter dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {/* Map through categories to create options */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {/* Capitalize first letter of category name */}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {/* Sort options */}
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Results count - shows number of products found */}
        <p className="text-gray-600">
          Showing {filteredAndSortedProducts.length} product
          {/* Pluralize 'product' if count is not 1 */}
          {filteredAndSortedProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Products Grid - conditionally render products or empty state */}
      {filteredAndSortedProducts.length > 0 ? (
        // Grid layout: 1 col mobile, 2 cols tablet (sm), 3 cols desktop (lg), 4 cols xl
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Map through filtered/sorted products and render ProductCard for each */}
          {filteredAndSortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleShowToast}
            />
          ))}
        </div>
      ) : (
        // Empty state - shown when no products match filters
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl">No products found.</p>
          {/* Button to clear all filters */}
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Toast Notification - conditionally rendered when toastMessage is set */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          type="success"
        />
      )}
    </div>
  )
}

// Export Products as default export
export default Products