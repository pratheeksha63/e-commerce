// Import React hooks needed for Context API and state management
import React, { createContext, useContext, useState, useEffect } from 'react'

// Create a new React Context for cart state management
// This context will hold the cart data and functions to manipulate it
const CartContext = createContext()

// Custom hook to access cart context
// This makes it easier to use the cart context in components
export const useCart = () => {
  // Get the context value from the nearest CartProvider
  const context = useContext(CartContext)
  // If context is undefined, it means this hook is used outside CartProvider
  if (!context) {
    // Throw an error with a helpful message for debugging
    throw new Error('useCart must be used within a CartProvider')
  }
  // Return the context value (cart state and functions)
  return context
}

// CartProvider component that wraps the app and provides cart state
// children prop contains all child components that need access to cart
export const CartProvider = ({ children }) => {
  // State to store the cart items array
  // Each item has: { id, name, price, image, category, quantity, etc. }
  const [cart, setCart] = useState([])
  // State to track if cart has been loaded from localStorage
  // Prevents saving before initial load is complete (prevents race condition)
  const [isLoaded, setIsLoaded] = useState(false)

  // Effect to load cart from localStorage when component mounts
  // Runs only once on mount (empty dependency array [])
  useEffect(() => {
    // Get saved cart data from browser's localStorage
    const savedCart = localStorage.getItem('cart')
    // If there's saved cart data, try to load it
    if (savedCart) {
      try {
        // Parse the JSON string back into a JavaScript object/array
        const parsedCart = JSON.parse(savedCart)
        // Validate that parsed cart is actually an array (safety check)
        if (Array.isArray(parsedCart)) {
          // Set the cart state to the loaded data
          setCart(parsedCart)
        } else {
          // If data is invalid, remove it from localStorage to prevent errors
          localStorage.removeItem('cart')
        }
      } catch (error) {
        // If parsing fails (corrupted data), log error and remove bad data
        console.error('Error loading cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
    // Mark that initial load is complete so we can start saving changes
    setIsLoaded(true)
  }, []) // Empty array means this only runs once on mount

  // Effect to save cart to localStorage whenever it changes
  // Runs whenever cart or isLoaded changes
  useEffect(() => {
    // Only save if we've finished loading initial data (prevents overwriting)
    if (isLoaded) {
      // Convert cart array to JSON string and save to localStorage
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded]) // Re-run when cart changes or when isLoaded changes

  // Function to add a product to the cart
  // product: the product object to add
  // quantity: how many to add (default is 1)
  const addToCart = (product, quantity = 1) => {
    // Validate that product exists and has an id
    if (!product || !product.id) {
      console.error('Invalid product:', product)
      return // Exit early if product is invalid
    }
    
    // Validate that quantity is a positive number
    if (quantity <= 0) {
      console.error('Invalid quantity:', quantity)
      return // Exit early if quantity is invalid
    }

    // Update cart state using functional update (to avoid stale closure issues)
    setCart((prevCart) => {
      // Check if this product already exists in the cart
      const existingItem = prevCart.find((item) => item.id === product.id)
      
      // If product already in cart, increase its quantity
      if (existingItem) {
        // Map through cart and update the matching item's quantity
        return prevCart.map((item) =>
          // If this is the item we're updating, add to its quantity
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item // Otherwise, return item unchanged
        )
      }
      
      // If product not in cart, add it as a new item with the specified quantity
      return [...prevCart, { ...product, quantity }]
    })
  }

  // Function to remove a product from the cart
  // productId: the ID of the product to remove
  const removeFromCart = (productId) => {
    // Filter out the item with the matching ID
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Function to update the quantity of a product in the cart
  // productId: the ID of the product to update
  // quantity: the new quantity value
  const updateQuantity = (productId, quantity) => {
    // If quantity is 0 or negative, remove the item instead
    if (quantity <= 0) {
      removeFromCart(productId)
      return // Exit early
    }
    
    // Map through cart and update the matching item's quantity
    setCart((prevCart) =>
      prevCart.map((item) =>
        // If this is the item we're updating, set its quantity to new value
        item.id === productId ? { ...item, quantity } : item // Otherwise return unchanged
      )
    )
  }

  // Function to clear all items from the cart
  const clearCart = () => {
    // Set cart to empty array
    setCart([])
  }

  // Function to get total number of items in cart (sum of all quantities)
  const getCartItemCount = () => {
    // Reduce array to sum all item quantities
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Function to calculate total price of all items in cart
  const getCartTotal = () => {
    // Reduce array to sum: (price * quantity) for each item
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Object containing all cart state and functions to share via context
  const value = {
    cart, // The cart array itself
    addToCart, // Function to add items
    removeFromCart, // Function to remove items
    updateQuantity, // Function to change quantities
    clearCart, // Function to empty cart
    getCartItemCount, // Function to get total item count
    getCartTotal, // Function to get total price
  }

  // Provide the value to all child components via Context Provider
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}