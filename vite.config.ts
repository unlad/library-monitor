import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

const repo = "library-monitor"

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  base: command === 'build' ? `/${repo}/` : '/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
}));
