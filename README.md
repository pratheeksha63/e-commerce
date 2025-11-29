# Bloom & Blossom - Flower Shop E-Commerce Website

A modern, responsive e-commerce website for a flower shop built with React, Vite, and Tailwind CSS.

## Features

- 🏠 **Home Page** with hero section and featured products
- 🛍️ **Product Listing** with search, filtering by category, and sorting
- 📦 **Product Detail Pages** with image gallery and quantity selector
- 🛒 **Shopping Cart** with add, update, and remove items functionality
- 💳 **Checkout Process** with form validation
- ✅ **Order Confirmation** page with order summary
- 📱 **Fully Responsive** mobile-first design
- 💾 **Persistent Cart** using localStorage

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for cart
- **localStorage** - Persistent cart storage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd sfw3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Project Structure

```
sfw3/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartItem.jsx
│   │   └── Toast.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderSuccess.jsx
│   ├── context/          # Context providers
│   │   └── CartContext.jsx
│   ├── data/             # Mock data
│   │   └── products.json
│   ├── utils/            # Utility functions
│   │   └── api.js
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── style.css         # Global styles with Tailwind
├── public/               # Static assets
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Routes

- `/` - Home page with featured products
- `/products` - Product listing with filters and search
- `/product/:id` - Individual product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/order-success` - Order confirmation page

## Mock Backend

Products are stored in `src/data/products.json`. The app currently uses this JSON file directly. 

### Optional: Using json-server

If you want to simulate a REST API, you can use json-server:

1. Install json-server:
   ```bash
   npm install -D json-server
   ```

2. Add a script to `package.json`:
   ```json
   "server": "json-server --watch src/data/products.json --port 3001"
   ```

3. Start the server:
   ```bash
   npm run server
   ```

4. Update `src/utils/api.js` to use the API endpoints (see commented code in the file)

## Features Overview

### Cart Management
- Add items to cart with quantity
- Update item quantities
- Remove items from cart
- Persistent storage using localStorage
- Cart item count badge in header

### Product Filtering & Search
- Search by product name or description
- Filter by category (roses, lilies, seasonal, etc.)
- Sort by name or price (low to high / high to low)

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Mobile-friendly navigation menu
- Touch-friendly buttons and interactions

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme. The primary color is currently set to a pink/rose theme.

### Products
Add or modify products in `src/data/products.json`. Each product should have:
- `id` - Unique identifier
- `name` - Product name
- `price` - Product price
- `category` - Product category
- `image` - Image URL
- `description` - Product description
- `inStock` - Boolean for availability
- `featured` - Boolean for featured products

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and not licensed for reuse, redistribution, or derivative works without explicit permission from the repository owner. For permission requests, contact the project owner via the GitHub repository.

---

Built with ❤️ using React + Vite + Tailwind CSS
