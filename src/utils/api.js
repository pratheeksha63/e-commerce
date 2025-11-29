// Mock API utility functions for fetching products
// In a real application, these would make HTTP requests to a backend API
// For now, they simulate API calls by importing data from the JSON file

// Import products data from JSON file (mock backend data)
import productsData from '../data/products.json'

// Function to fetch all products
// Returns: Promise that resolves to array of all products
export const fetchProducts = async () => {
  // Simulate network delay (300ms) to make it feel like a real API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  // Return the products array
  return productsData
}

// Function to fetch a single product by ID
// id: The product ID to search for
// Returns: Promise that resolves to the product object, or undefined if not found
export const fetchProductById = async (id) => {
  // Simulate network delay (300ms) to make it feel like a real API call
  await new Promise((resolve) => setTimeout(resolve, 300))
  // Find product with matching ID (parseInt converts string id to number)
  return productsData.find((product) => product.id === parseInt(id))
}

// ============================================================================
// Optional: REST API Implementation using json-server
// ============================================================================
// If you want to use a real REST API instead of mock data:
// 1. Install json-server: npm install -D json-server
// 2. Add script to package.json: "server": "json-server --watch src/data/products.json --port 3001"
// 3. Run the server: npm run server
// 4. Uncomment the code below and comment out the functions above

/*
// Function to fetch all products from REST API
export const fetchProducts = async () => {
  // Make GET request to products endpoint
  const response = await fetch('http://localhost:3001/products')
  // Check if response was successful (status 200-299)
  if (!response.ok) {
    // Throw error if request failed
    throw new Error('Failed to fetch products')
  }
  // Parse JSON response and return products array
  return response.json()
}

// Function to fetch a single product by ID from REST API
export const fetchProductById = async (id) => {
  // Make GET request to specific product endpoint
  const response = await fetch(`http://localhost:3001/products/${id}`)
  // Check if response was successful
  if (!response.ok) {
    // Throw error if request failed
    throw new Error('Failed to fetch product')
  }
  // Parse JSON response and return product object
  return response.json()
}
*/