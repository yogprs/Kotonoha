// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      anilistAPI: process.env.ANILIST_API_URL,
    }
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint'
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
  typescript: {
    tsConfig: {
      include: ["types/**/*.d.ts"]
    }
  }
})