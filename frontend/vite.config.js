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
        // Split code into vendor chunks for better caching.
        // NOTE: @splinetool/react-spline must NOT be listed here. Naming it makes
        // Rollup treat it as a static chunk, which makes Vite emit a
        // <link rel="modulepreload"> for it and defeats the lazy() in
        // DeferredSpline. Left out, it becomes a true on-demand chunk.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-animations': ['framer-motion'],
          'vendor-icons': ['react-icons']
        }
      }
    },
    
    // Minification settings for better performance
    minify: 'terser',
    
    // Target modern browsers for better performance
    target: 'ES2020',
    
    // CSS optimization
    cssCodeSplit: true,
    
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
      'lodash.debounce'  // Pre-bundle CommonJS module used by @splinetool/react-spline
    ],
    // Exclude Spline to reduce initial bundle
    exclude: ['@splinetool/react-spline'],
    esbuildOptions: {
      supported: {
        bigint: false
      }
    }
  }
})
