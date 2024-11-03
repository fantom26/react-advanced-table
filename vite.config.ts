import react from "@vitejs/plugin-react";
import { URL, fileURLToPath, resolve } from "node:url";
import { defineConfig } from "vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 8080,
    strictPort: true,
    open: true
  },
  build: {
    target: "modules", // https://vitejs.dev/config/build-options#build-target
    sourcemap: "hidden", // https://vitejs.dev/config/build-options#build-sourcemap
    chunkSizeWarningLimit: 600, // https://vitejs.dev/config/build-options#build-chunksizewarninglimit
    minify: "esbuild", // https://vitejs.dev/config/build-options#build-minify
    cssMinify: "lightningcss", // https://vitejs.dev/config/build-options#build-cssminify,
    cssCodeSplit: true // https://vitejs.dev/config/build-options#build-csscodesplit
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  }
});
