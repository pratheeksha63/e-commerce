// Import React library and useEffect hook
import React, { useEffect } from 'react'

// Toast component - displays a temporary notification message
// message: the text to display in the toast
// onClose: callback function to call when toast should be closed
// type: the type of toast ('success', 'error', or default 'blue') - determines background color
const Toast = ({ message, onClose, type = 'success' }) => {
  // Effect to automatically close toast after 3 seconds
  useEffect(() => {
    // Set a timer that calls onClose after 3000ms (3 seconds)
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    // Cleanup function: clear the timer if component unmounts before timer completes
    return () => clearTimeout(timer)
  }, [onClose]) // Re-run if onClose function changes

  // Determine background color based on toast type
  const bgColor =
    type === 'success'
      ? 'bg-green-500' // Green for success messages
      : type === 'error'
      ? 'bg-red-500' // Red for error messages
      : 'bg-blue-500' // Blue for other message types

  return (
    // Toast container - fixed position at top-right, with animation
    <div
      className={`fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 transition-all duration-300 transform translate-x-0 opacity-100`}
      style={{
        // Inline style for slide-in animation
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      {/* Message text */}
      <span>{message}</span>
      {/* Close button (X) - allows manual dismissal */}
      <button
        onClick={onClose}
        className="ml-2 text-white hover:text-gray-200 font-bold"
        aria-label="Close"
      >
        {/* X symbol for closing */}
        ✕
      </button>
      {/* Inline styles for slide-in animation keyframes */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

// Export Toast as default export
export default Toast