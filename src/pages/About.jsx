import React, { useEffect, useState } from 'react'

const About = () => {
  const scrollToFooter = (e) => {
    e.preventDefault()
    const el = document.getElementById('site-footer')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="container mx-auto px-4 py-20 max-w-5xl relative">
      {/* Subtle background gradient and vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-purple-100 opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
      </div>

      <div className="text-center mb-12 relative z-10">
        <span className="text-7xl block animate-bounce">🌸</span>
        <h1 className="text-5xl font-extrabold mt-4 text-gray-900 tracking-tight drop-shadow">About Bloom & Blossom</h1>
        <div className="h-1 w-32 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded mt-4"></div>
        <p className="text-gray-600 mt-2 text-lg">Local flowers, crafted by community vendors.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Mission, Goal, and Value boxes */}
        <div className="space-y-6">
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-gray-100 ring-2 ring-pink-100 hover:ring-pink-300 transition-all">
            <h2 className="text-2xl font-bold mb-2 text-pink-700">Our Mission</h2>
            <p className="text-gray-600 text-base">
              We partner with nearby growers and artisan florists to source seasonal blooms and supplies. By prioritizing local vendors we reduce transport impact, strengthen local livelihoods, and keep our bouquets rooted in the community.
            </p>
          </div>
          <div className="bg-white/95 rounded-2xl shadow-lg p-8 border border-gray-100 ring-2 ring-purple-100 hover:ring-purple-300 transition-all">
            <h2 className="text-2xl font-bold mb-2 text-purple-700">Our Goal</h2>
            <p className="text-gray-600 text-base">
              To create consistent opportunities for small vendors by providing fair margins, educational workshops, and an easy channel to reach customers looking for handcrafted, sustainable floral products.
            </p>
          </div>
          {/* Small value boxes */}
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="p-5 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow text-center ring-1 ring-pink-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-pink-700">Local</h4>
              <p className="text-sm text-gray-500">Sourced nearby</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow text-center ring-1 ring-purple-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-purple-700">Fair</h4>
              <p className="text-sm text-gray-500">Fair margins</p>
            </div>
            <div className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow text-center ring-1 ring-yellow-200 hover:scale-105 transition-transform">
              <h4 className="font-semibold text-yellow-700">Craft</h4>
              <p className="text-sm text-gray-500">Handmade arrangements</p>
            </div>
          </div>
          <div className="text-right mt-6">
            <a
              href="#site-footer"
              onClick={scrollToFooter}
              className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform font-semibold tracking-wide"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Logo image on the right */}
        <div className="flex justify-center md:justify-end">
          <div className="w-64 h-64 bg-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border-4 border-pink-100 ring-2 ring-purple-100">
            <img
              src="/Floral studio.jpg"
              alt="Bloom & Blossom logo"
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Logo' }}
            />
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <StatCard icon="💐" label="Bouquets sold" value={1240} />
          <StatCard icon="😊" label="Happy customers" value={980} />
          <StatCard icon="🤝" label="Local vendors" value={24} />
        </div>
      </div>
    </section>
  )
}

export default About

// Small stat card component with animation
function StatCard({ icon, label, value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf
    const duration = 1200
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div className="p-8 bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-2xl shadow-xl flex flex-col items-center text-center border border-pink-100 ring-2 ring-purple-100 hover:scale-105 hover:ring-pink-300 transition-all">
      <div className="text-5xl mb-3 drop-shadow-lg">{icon}</div>
      <div className="text-4xl font-extrabold text-gray-800 tracking-tight animate-pulse">{count.toLocaleString()}</div>
      <div className="text-base text-gray-500 mt-2 font-medium">{label}</div>
    </div>
  )
}
