import { defineConfig } from "vite";
import { staticSitePlugin } from "./src/build/static-site-plugin";

export default defineConfig({
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    manifest: true,
    rolldownOptions: {
      input: {
        main: "src/main.ts",
      },
    },
  },
  plugins: [staticSitePlugin()],
});
