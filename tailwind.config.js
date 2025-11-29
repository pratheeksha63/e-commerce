/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration file
// This file customizes Tailwind's default theme and tells it which files to scan for class names

export default {
  // Content array: files that Tailwind should scan for class names
  // Only classes found in these files will be included in the final CSS
  content: [
    "./index.html", // Scan HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src directory
  ],
  
  // Theme customization
  theme: {
    // Extend the default theme (adds new values without overriding defaults)
    extend: {
      // Custom color palette
      colors: {
        // Primary brand colors (rose/pink theme for flower shop)
        primary: {
          50: '#fef7f7', // Lightest shade
          100: '#feeced',
          200: '#fdd9db',
          300: '#fbb6b9',
          400: '#f7888d',
          500: '#f05d64', // Base color
          600: '#de3d45', // Default hover/active
          700: '#ba2e35',
          800: '#9a2930',
          900: '#81292e', // Darkest shade
        },
        // Note: Other Tailwind colors (gray, red, green, etc.) are still available
      },
      // Custom animations
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  
  // Plugins array: add Tailwind plugins here
  plugins: [
    // Currently no plugins installed
    // Example plugins: @tailwindcss/forms, @tailwindcss/typography
  ],
}