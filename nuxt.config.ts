// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Kotonoha',
      htmlAttrs: {
        lang: 'en', // Set your site's language here (e.g., 'es' for Spanish)
      },
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    dice_bear_image: process.env.DICE_BEAR_IMAGE ?? '',
    // cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    // cloudinary_api_key: process.env.CLOUDINARY_API_KEY ?? '',
    // cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET ?? '',
    redis_host: process.env.REDIS_HOST ?? '',
    redis_port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    redis_password: process.env.REDIS_PASSWORD ?? '',
    public: {
      anilistAPI: process.env.ANILIST_API_URL ?? '',
      timeout: 8000,
    },
  },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],
  pinia: {
    storesDirs: ['./stores/**', './app/stores/**'],
  },
  googleFonts: {
    families: {
      'Lora': true,
      'Original Surfer': true,
    },
  },
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    strict: true,
    // typeCheck: true,
    tsConfig: {
      compilerOptions: {
        module: 'ESNext',
      },
    },
  },
  nitro: {
    // routeRules: {
    //   '/api/**': {
    //     cors: true,
    //   },
    // },
    storage: {
      cache: {
        driver: 'redis',
        host: process.env.REDIS_HOST ?? '',
        port: process.env.REDIS_PORT ?? '',
        password: process.env.REDIS_PASSWORD ?? '',
      },
      // cache: process.env.APP_MODE === 'production' ? {
      //   driver: 'redis',
      //   host: process.env.REDIS_HOST ?? '',
      //   port: process.env.REDIS_PORT ?? '',
      //   password: process.env.REDIS_PASSWORD ?? '',
      // } : {
      //   driver: 'memory'
      // }
    },
  },
});
