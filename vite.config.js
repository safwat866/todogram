import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Todogram",
        short_name: "Todogram",
        start_url: "/task/inbox",
        display: "standalone",
        background_color: "#1E293B",
        theme_color: "#0F172A",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Combines both purposes in a single declaration
          },
        ],
      },
      // devOptions: {
      //   enabled: true,
      // },
    }),
  ],
});
