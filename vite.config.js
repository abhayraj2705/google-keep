import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Expose env variables
    'process.env.VITE_HUGGINGFACE_API_KEY': JSON.stringify(process.env.VITE_HUGGINGFACE_API_KEY),
  },
  server: {
    // Show environment loading issues during development
    watch: {
      ignored: ['!**/.env']
    }
  }
});
