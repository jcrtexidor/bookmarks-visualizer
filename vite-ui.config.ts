import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// This file compile the ui for the firefox extension
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: false,  // Compiled files must be cleared mannually
    rollupOptions: {
      output: {
        entryFileNames: 'ui.js'
      }
    }
  },

})
