// PostCSS configuration file
// PostCSS processes CSS files before they're used in the application
// This config tells PostCSS which plugins to use

export default {
  // Plugins to apply to CSS files (in order)
  plugins: {
    // Tailwind CSS plugin - processes @tailwind directives and generates utility classes
    tailwindcss: {},
    
    // Autoprefixer plugin - automatically adds vendor prefixes (-webkit-, -moz-, etc.)
    // Ensures CSS works across different browsers
    autoprefixer: {},
  },
}