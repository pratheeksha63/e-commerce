// Import React library
import React from 'react'
// Import Link component for navigation links
import { Link } from 'react-router-dom'

// Footer component - appears at the bottom of every page
const Footer = () => {
  return (
    // Footer element with dark background, white text, and auto margin-top to push to bottom
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl animate-pulse">🌸</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse delay-300">🌺</div>
        <div className="absolute bottom-20 left-1/4 text-3xl animate-pulse delay-700">🌷</div>
        <div className="absolute bottom-10 right-1/3 text-4xl animate-pulse delay-500">🌻</div>
      </div>
      
      {/* Container with max width, centered, and padding */}
      <div id="site-footer" className="container mx-auto px-4 py-12 relative z-10">
        {/* Grid layout: 1 column on mobile, 3 columns from md breakpoint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* About section */}
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/5 rounded-2xl opacity-50"></div>
            
            {/* Content wrapper with padding and relative positioning */}
            <div className="relative p-6 rounded-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10">
              {/* Company name with flower emoji */}
              <h3 className="text-2xl font-bold mb-5 flex items-center group">
                {/* Animated flower emoji container */}
                <span className="mr-3 text-3xl transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  🌸
                </span>
                {/* Company name with gradient text */}
                <span className="bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                  Bloom & Blossom
                </span>
              </h3>
              
              {/* Decorative divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-5"></div>
              
              {/* Company description text with improved typography */}
              <p className="text-gray-300 leading-relaxed text-base mb-4 font-light">
                Bringing beauty and joy to your special moments with fresh,
                hand-picked flowers.
              </p>
              
              {/* Additional decorative elements */}
              <div className="flex items-center space-x-2 mt-4 text-primary-400/60">
                <span className="text-sm">✨</span>
                <span className="text-xs font-light italic text-gray-400">
                  Crafted with care, delivered with love
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links section */}
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 rounded-2xl opacity-50"></div>
            
            {/* Content wrapper */}
            <div className="relative p-6 rounded-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
              {/* Section heading with icon */}
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2 text-2xl">🔗</span>
                <span className="bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                  Quick Links
                </span>
              </h4>
              
              {/* Decorative divider */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-6"></div>
              
              {/* List of navigation links with vertical spacing */}
              <ul className="space-y-3">
                {/* Home link */}
                <li>
                  <Link
                    to="/"
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Home</span>
                  </Link>
                </li>
                {/* Products link */}
                <li>
                  <Link
                    to="/products"
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Products</span>
                  </Link>
                </li>
                {/* Shopping Cart link */}
                <li>
                  <Link
                    to="/cart"
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>Shopping Cart</span>
                  </Link>
                </li>
                {/* Orders link */}
                <li>
                  <Link
                    to="/orders"
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span>My Orders</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social Media section */}
          <div className="relative">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5 rounded-2xl opacity-50"></div>
            
            {/* Content wrapper */}
            <div className="relative p-6 rounded-2xl border border-gray-700/50 hover:border-primary-500/30 transition-all duration-300">
              {/* Section heading with icon */}
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-2 text-2xl">💬</span>
                <span className="bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-transparent">
                  Connect With Us
                </span>
              </h4>
              
              {/* Decorative divider */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mb-6"></div>
              
              {/* Social media icons container with horizontal spacing */}
              <div className="flex space-x-4 mb-6">
                {/* Facebook link */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center bg-gray-700/50 hover:bg-primary-600 rounded-full text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/50"
                  aria-label="Facebook"
                >
                  <span className="transform group-hover:scale-110 transition-transform">📘</span>
                </a>
                {/* Instagram link */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center bg-gray-700/50 hover:bg-primary-600 rounded-full text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/50"
                  aria-label="Instagram"
                >
                  <span className="transform group-hover:scale-110 transition-transform">📷</span>
                </a>
                {/* Twitter link */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center bg-gray-700/50 hover:bg-primary-600 rounded-full text-2xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/50"
                  aria-label="Twitter"
                >
                  <span className="transform group-hover:scale-110 transition-transform">🐦</span>
                </a>
              </div>
              
              {/* Contact information */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-primary-400 text-lg">✉️</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Email</p>
                    <a 
                      href="mailto:hello@bloomblossom.com" 
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium"
                    >
                      hello@bloomblossom.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-primary-400 text-lg">📞</span>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Phone</p>
                    <a 
                      href="tel:+15551234567" 
                      className="text-gray-300 hover:text-primary-400 transition-colors text-sm font-medium"
                    >
                      (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright section with top border */}
        <div className="relative mt-12 pt-8 border-t border-gray-700/50">
          {/* Decorative top gradient line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent"></div>
          
          <div className="text-center">
            {/* Decorative elements */}
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary-500/50 rounded-full"></div>
              <span className="text-2xl opacity-50">🌸</span>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary-500/50 rounded-full"></div>
            </div>
            
            {/* Copyright text */}
            <p className="text-gray-400 text-sm mb-2">
              &copy; 2024 <span className="text-primary-400 font-semibold">Bloom & Blossom</span>. All rights reserved.
            </p>
            
            {/* Additional decorative text */}
            <p className="text-gray-500 text-xs">
              Made with <span className="text-primary-400">💖</span> for flower lovers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Export Footer as default export
export default Footer