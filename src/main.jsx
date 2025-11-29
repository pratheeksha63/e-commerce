// Import React library for creating React components
import React from 'react'
// Import ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client'
// Import the main App component that contains all routes and layout
import App from './App'
// Import global styles including Tailwind CSS directives
import './style.css'

// Get the root DOM element by ID (the div with id="root" in index.html)
// Create a React root and render the App component wrapped in StrictMode
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems in the app during development
  <React.StrictMode>
    {/* Main App component that contains all routes and providers */}
    <App />
  </React.StrictMode>,
)