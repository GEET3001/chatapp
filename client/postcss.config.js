module.exports = {
  plugins: {
    'postcss-import': {}, 
    tailwindcss: {}, 
    'postcss-nesting': {}, // CSS nesting (optional)
    autoprefixer: {}, // Autoprefixer
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: 'default', // Minify CSS for production
          },
        }
      : {}),
  },
};