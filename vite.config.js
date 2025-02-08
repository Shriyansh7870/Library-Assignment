import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://www.dbooks.org", // The backend API
        changeOrigin: true, // This ensures the origin is set correctly
        secure: false, // Set to true if you're using https
        rewrite: (path) => path.replace(/^\/api/, ""), // Removes the `/api` prefix from the request
      },
    },
  },
});
