// nuxt.config.ts
import dotenv from 'dotenv'; // <--- ADD THIS IMPORT

// --- CRITICAL FIX: Load .env.development.local for local development ---
// Only load if not running in a build environment where Vercel injects them
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL_ENV !== 'production') {
  dotenv.config({ path: '.env.development.local' });
}
// --- END CRITICAL FIX ---


export default defineNuxtConfig({
  ssr: true, 
  pages: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    resendApiKey: process.env.NUXT_RESEND_API_KEY,
    public: {
      // Use POSTGRES_URL if it's the primary one, otherwise DATABASE_URL
      // The error specifically mentions POSTGRES_URL
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    }
  },
  
  nitro: {
    preset: 'vercel', 
    prerender: {
      routes: [
        '/',
        '/about',
        '/contact',
        '/services',
        '/who-we-are',
        '/admin/login', 
      ],
      crawlLinks: false,
      autoGroup: false,
    },
  },

  content: {
    documentDriven: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' 
        }
      ]
    }
  }
});