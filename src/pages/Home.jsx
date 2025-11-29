// Import React library
import React from 'react'
// Import Link component for navigation
import { Link } from 'react-router-dom'
// Import ProductCard component to display products
import ProductCard from '../components/ProductCard'
// Import products data from JSON file (mock backend)
import productsData from '../data/products.json'

// Home page component - displays hero section and featured products
const Home = () => {
  // Filter products to only show those marked as featured
  // Featured products are typically displayed on the homepage
  const featuredProducts = productsData.filter((product) => product.featured)

  return (
    // Main container with minimum full screen height
    <div className="min-h-screen">
      {/* Hero Section - large banner at top of page */}
      <section className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-28 md:py-40 px-4 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Decorative floating flower elements with more variety */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 text-7xl animate-pulse">🌸</div>
          <div className="absolute top-32 right-20 text-6xl animate-pulse delay-300">🌺</div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-pulse delay-700">🌷</div>
          <div className="absolute bottom-32 right-1/3 text-6xl animate-pulse delay-500">🌻</div>
          <div className="absolute top-1/2 left-1/3 text-4xl animate-pulse delay-1000">🌹</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-150">🌼</div>
        </div>
        
        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 via-transparent to-primary-800/20"></div>
        
        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-500 opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full animate-ping delay-1000 opacity-60"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-700 opacity-60"></div>
        </div>
        
        {/* Container with max width, centered, and text centered */}
        <div className="container mx-auto text-center relative z-10">
          {/* Decorative flower emoji above heading with glow effect */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <span className="text-7xl md:text-8xl animate-bounce-slow block filter drop-shadow-2xl">🌸</span>
              <span className="absolute inset-0 text-7xl md:text-8xl animate-pulse opacity-50 blur-sm">🌸</span>
            </div>
          </div>
          
          {/* Main heading - larger on desktop (md breakpoint) */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight">
            <span className="block mb-3 bg-gradient-to-r from-white via-primary-50 via-white to-primary-50 bg-clip-text text-transparent animate-gradient">
              Welcome to
            </span>
            <span className="block text-white drop-shadow-2xl relative">
              <span className="relative z-10">Bloom & Blossom</span>
              <span className="absolute inset-0 text-white opacity-30 blur-xl">Bloom & Blossom</span>
            </span>
          </h1>
          
          {/* Enhanced decorative divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/40 to-white/40 rounded-full"></div>
            <div className="mx-6 text-3xl animate-spin-slow">✨</div>
            <div className="w-32 h-1 bg-gradient-to-l from-transparent via-white/40 to-white/40 rounded-full"></div>
          </div>
          
          {/* Subtitle text with enhanced styling */}
          <p className="text-2xl md:text-3xl lg:text-4xl mb-12 text-primary-50 font-extralight max-w-3xl mx-auto leading-relaxed tracking-wide">
            Fresh flowers delivered with <span className="font-normal text-white">love</span>
          </p>
          
          {/* Enhanced call-to-action button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center bg-white text-primary-600 px-12 py-5 rounded-full font-bold hover:bg-primary-50 transition-all duration-500 text-xl shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transform overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-400/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center space-x-3">
                <span>Shop Now</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
              </span>
              <span className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors"></span>
            </Link>
          </div>
          
          {/* Decorative bottom elements */}
          <div className="mt-16 flex justify-center space-x-8 opacity-60">
            <div className="text-2xl animate-bounce delay-300">🌷</div>
            <div className="text-2xl animate-bounce delay-500">🌺</div>
            <div className="text-2xl animate-bounce delay-700">🌻</div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 fill-white/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative container mx-auto px-4 py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, primary-500 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        {/* Section header with enhanced decorative elements */}
        <div className="text-center mb-20 relative z-10">
          {/* Decorative top elements */}
          <div className="flex justify-center items-center mb-6 space-x-4">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary-400 to-primary-500 rounded-full"></div>
            <div className="text-3xl animate-pulse">🌺</div>
            <div className="w-20 h-1 bg-gradient-to-l from-transparent via-primary-400 to-primary-500 rounded-full"></div>
          </div>
          
          {/* Section heading with enhanced styling */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-800 relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent">
              Featured Products
            </span>
            <span className="absolute -top-4 -right-4 text-4xl opacity-20 animate-pulse">🌺</span>
            <span className="absolute -bottom-2 -left-4 text-3xl opacity-15 animate-pulse delay-500">🌸</span>
          </h2>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Handpicked selections to <span className="font-medium text-primary-600">brighten</span> your day
          </p>
          
          {/* Enhanced decorative bottom element */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary-300 rounded-full"></div>
              <span className="text-primary-400 text-2xl animate-spin-slow">✨</span>
              <div className="w-8 h-1 bg-primary-400 rounded-full"></div>
              <span className="text-primary-400 text-xl">💐</span>
              <div className="w-8 h-1 bg-primary-400 rounded-full"></div>
              <span className="text-primary-400 text-2xl animate-spin-slow">✨</span>
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary-300 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Grid layout: 1 column on mobile, 2 on tablet (sm), 3 on desktop (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20 relative z-10">
          {/* Map through featured products and render a ProductCard for each */}
          {featuredProducts.map((product, index) => (
            // ProductCard component - key prop is required for React lists
            <div 
              key={product.id} 
              className="transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Enhanced link to view all products */}
        <div className="text-center relative z-10">
          <Link
            to="/products"
            className="group relative inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white px-12 py-5 rounded-full font-bold hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 transition-all duration-500 shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transform overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></span>
            <span className="relative z-10 flex items-center space-x-3">
              <span className="text-lg">View All Products</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-2xl">→</span>
            </span>
            <span className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-colors"></span>
          </Link>
        </div>
      </section>
    </div>
  )
}

// Export Home as default export
export default Home