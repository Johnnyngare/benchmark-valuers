// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // Keep SSR true for APIs and other pages
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
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    }
  },
  
  nitro: {
    // Keep preset as default 'vercel' for hybrid build (SSR + API functions)
    preset: 'vercel', 
    prerender: {
      // --- CRITICAL FIX: Carefully define prerender routes ---
      // Prerender only essential static-like pages to avoid crashing on dynamic fetches
      routes: [
        '/',
        '/about',
        '/contact',
        '/services',
        '/who-we-are',
        '/signup/PRERENDER_PLACEHOLDER_TOKEN', // Keep this for testing signup prerender
        '/admin/login', // Prerender admin login if desired (it's static)
        // DO NOT automatically prerender dynamic blog posts (e.g., /blog/:slug) here
        // as fetching them can crash the build if data isn't robust during build.
        // Let them be SSR/client-side rendered on demand.
      ],
      crawlLinks: false, // Set to false if you manually specify all prerender routes
      autoGroup: false,  // Set to false if you manually define server functions / routes.
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