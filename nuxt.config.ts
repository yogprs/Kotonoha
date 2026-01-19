// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      anilistAPI: process.env.ANILIST_API_URL ?? '',
    }
  },
  srcDir: 'app/',
  alias: {
    "~/types": fileURLToPath(new URL('./app/types', import.meta.url)),
    "~/components": fileURLToPath(new URL('./app/components', import.meta.url)),
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
    strict: true,
    typeCheck: false,
  },
  // typescript: {
  //   strict: true,
  //   tsConfig: {
  //     include: [
  //       'nuxt.d.ts',
  //       '.nuxt/**/*.ts',
  //       'types/**/*.ts',
  //       'types/**/*.d.ts',
  //     ],
  //   },
  // },
})