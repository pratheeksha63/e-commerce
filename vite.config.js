// Import Vite's configuration function
import { defineConfig } from 'vite'
// Import React plugin for Vite to enable JSX and React support
import react from '@vitejs/plugin-react'

// Vite configuration
// See: https://vite.dev/config/
export default defineConfig({
  // Array of plugins to use during build/dev
  plugins: [
    // React plugin enables:
    // - JSX/TSX file support
    // - Fast Refresh (hot module replacement for React)
    // - Automatic JSX runtime
    react(),
  ],
})