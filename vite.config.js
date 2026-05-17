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
            src: "/logo-512.jpg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/logo-512.jpg",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
