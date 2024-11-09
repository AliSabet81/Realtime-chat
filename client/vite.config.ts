import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  server: {
    host: true,
    port: 3333,
  },
  preview: {
    port: 3333,
    strictPort: true,
    host: true,
  },
  define: {
    global: {},
    "process.env": {},
  },
  plugins: [nodePolyfills(), react(), tsconfigPaths()],
  resolve: {
    alias: {
      process: "process/browser",
    },
  },
});
