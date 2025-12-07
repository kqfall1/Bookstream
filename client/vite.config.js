import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = process.env.PORT || 3000

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      input: "./index.html",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      }
    }
  }
});

