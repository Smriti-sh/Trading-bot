import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@repo/common": path.resolve(__dirname, "../../packages/common/index.ts"),
      "@repo/common/metadata": path.resolve(__dirname, "../../packages/common/metadata/index.ts"),
    },
  },
})