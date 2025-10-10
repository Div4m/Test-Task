// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5175,  // your dev server port
//     open: true,  // opens browser automatically
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: "dist"
  },
  // Optional: for SPA fallback in dev
  // only needed if you encounter refresh 404
  // most Vite setups work without this
});
