// nuxt.config.ts
export default defineNuxtConfig({
  // Keep SSR as true (default or explicit) for API functions and other pages
  ssr: true, 

  // Ensure 'pages: true' is still there
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
  
  // --- CRITICAL FIX: Configure Nitro for Prerendering ---
  nitro: {
    prerender: {
      // Explicitly define the routes to prerender.
      // We include the home page and the signup page.
      // This will attempt to generate static HTML for these paths at build time.
      routes: [
        '/',
        // Prerender a placeholder for the signup route.
        // This *might* need a dummy token if Nuxt expects route params during prerender.
        // Let's try without a dummy token first if the page handles missing params gracefully.
        // If it fails, we might need `/signup/dummy-token`
        '/signup/PRERENDER_PLACEHOLDER_TOKEN', 
      ],
      crawlLinks: true, // Allow crawling for other pages to be prerendered
      autoGroup: true,  // Allow auto-grouping of server functions
    },
    // Keep preset as default 'vercel' for hybrid build (SSR + API functions)
    preset: 'vercel', 
  },
  // --- END CRITICAL FIX ---

  // For @nuxt/content in a Universal app with prerendering
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