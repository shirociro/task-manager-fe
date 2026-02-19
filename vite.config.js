import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path"; // <-- add this

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // <-- add this alias
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // KB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'flowbite-react'] // put big libraries in separate chunk
        }
      }
    }
  }
});
