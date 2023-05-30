// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  base: "./",
  preview: {
    host: true,
  },
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        beautyprofil: resolve(__dirname, "src/beautyprofil.html"),
        fordele: resolve(__dirname, "src/minefordele.html"),
        abonnement: resolve(__dirname, "src/mitabonnement.html"),
        personligeoplysninger: resolve(__dirname, "src/personligeoplys.html"),
        singleview: resolve(__dirname, "src/singleview.html"),
        sitemap: resolve(__dirname, "src/sitemap.html"),
        tilpasbox: resolve(__dirname, "src/tilpasbox.html"),
        // about: resolve(__dirname, "src/about.html"),
      },
    },
  },
});
