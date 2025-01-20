import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enable source maps for better debugging
    rollupOptions: {
      external: [], // Specify external dependencies if needed
    },
  },
  
});
