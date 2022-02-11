import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    VitePWA({
      includeAssets: [
        "favicon.png",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "McArthur's self-service kiosk",
        short_name: "McArthur's",
        lang: "en-US",
        display: "standalone",
        orientation: "landscape",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "./img/icons/512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "./img/icons/512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./img/icons/192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        permissions: ["unlimitedStorage", "fullscreen"],
        splash_pages: null,
        registerType: "autoUpdate",
      },
    }),
  ],
});
