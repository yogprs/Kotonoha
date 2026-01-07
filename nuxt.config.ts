// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  pinia: {
    storesDirs: ['./stores/**', './app/stores/**'],
  },
  googleFonts: {
    families: {
      Lora: true,
      "Original Surfer": true,
    }
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})