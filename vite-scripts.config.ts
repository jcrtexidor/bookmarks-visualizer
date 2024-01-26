import { defineConfig } from 'vite'

// https://vitejs.dev/config/


// This file compile the background scripts for the firefox extension
export default defineConfig({
  base: './',
  build: {
    emptyOutDir: false, // Compiled files must be cleared mannually
    rollupOptions: {
      input: {
        'background-script' : "./scripts/background-script.ts"
      },
      output: {
        format: "umd",
        strict: true,
        entryFileNames: "[name].js",
        dir: "dist"
      },
    }
  }
})
