import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Handle CommonJS dependencies in development mode
  resolve: {
    // Ensure CommonJS modules are properly handled
    mainFields: ['module', 'main'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  
  build: {
    // Optimize bundling with code splitting
    rollupOptions: {
      output: {
        // Split code into vendor chunks for better caching
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animations': ['framer-motion'],
          'vendor-icons': ['react-icons'],
          'vendor-http': ['axios'],
          // Spline loads on demand
        }
      }
    },
    
    // Minification settings for better performance
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      },
      output: {
        comments: false
      }
    },
    
    // Target modern browsers for better performance
    target: 'ES2020',
    
    // CSS optimization
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    
    // Disable source maps in production (save space)
    sourcemap: false,
    
    // Report compressed sizes for monitoring
    reportCompressedSize: true,
    
    // Chunk size warnings threshold
    chunkSizeWarningLimit: 1000
  },
  
  server: {
    // Vite HMR will auto-detect the correct port from browser location
    // This fixes WebSocket connection issues when dev server uses dynamic ports
    middlewareMode: false,
    cors: true
  },
  
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom', 
      'framer-motion', 
      'react-icons', 
      'axios',
      'lodash.debounce'  // Pre-bundle CommonJS module used by @splinetool/react-spline
    ],
    exclude: ['@splinetool/react-spline'], // Spline loads on demand
    esbuildOptions: {
      supported: {
        bigint: false
      }
    },
    // Force regenerate bundle on start to avoid caching issues
    force: process.env.NODE_ENV === 'development'
  }
})
