<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-brand-secondary-dark to-blue-800 text-white py-24 md:py-40 min-h-[500px] flex items-center justify-center overflow-hidden"> <!-- ADJUSTED: py-40 for more height, min-h for consistency -->
      <div class="absolute inset-0 z-0 opacity-30" style="background-image: url('/images/hero-bg.jpg'); background-size: cover; background-position: center;"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          Market-driven real estate consultancy services
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in">
          Professional valuation and consultancy services for all your real estate needs in Kenya.
        </p>
        <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <!-- UPDATED: Request Valuation to Remove Quote -->
          <BaseButton to="/contact" text="Request Quotation" variant="primary" />
          <!-- REMOVED: "Our Services" button as requested -->
        </div>
      </div>
    </section>

    <!-- Practice Areas Section (formerly Services Overview) -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4">
        <!-- UPDATED: Renamed header, REMOVED "Our Core Services" -->
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Practice Areas</h2>
        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Comprehensive real estate valuation and consultancy solutions tailored to your needs.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="fas fa-chart-pie"
            title="Property Valuation"
            description="Accurate market valuations for residential, commercial, and industrial properties."
            link="/services/property-valuation" 
          />
          <ServiceCard
            icon="fas fa-lightbulb"
            title="Investment Advisory"
            description="Strategic guidance for real estate investment and market analysis."
            link="/services/investment-advisory" 
          />
          <ServiceCard
            icon="fas fa-building"
            title="Asset Management" 
            description="Comprehensive management of real estate assets to maximize value and returns."
            link="/services/asset-management"
          />
          <!-- ADDED: Mortgage Valuation for 3-column layout to fill the grid nicely -->
          <ServiceCard
            icon="fas fa-hand-holding-usd"
            title="Mortgage Valuation"
            description="Expert valuations for mortgage financing, ensuring fair and accurate property assessments."
            link="/services/mortgage-valuation"
          />
        </div>
        <div class="text-center mt-12">
          <BaseButton to="/services" text="View All Practice Areas" variant="light" /> <!-- UPDATED: Text -->
        </div>
      </div>
    </section>

    <!-- About Us Preview Section (formerly Who We Are Preview) -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">About Us</h2> <!-- UPDATED: Renamed header -->
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Benchmark Valuers Ltd is a leading real estate valuation and consultancy firm in Kenya,
            providing market-driven solutions to clients across various sectors.
            With years of experience and a team of certified professionals, we deliver accurate,
            reliable, and timely services that meet international standards.
          </p>
          <BaseButton to="/about" text="Learn More About Us" variant="primary" /> <!-- UPDATED: Link text -->
        </div>
        <div class="md:w-1/2 grid grid-cols-2 gap-6">
          <div class="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p class="text-4xl font-bold text-brand-primary mb-2">500+</p>
            <p class="text-gray-700">Projects Completed</p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p class="text-4xl font-bold text-brand-primary mb-2">15+</p>
            <p class="text-gray-700">Years Experience</p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p class="text-4xl font-bold text-brand-primary mb-2">50+</p>
            <p class="text-gray-700">Expert Team</p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
            <p class="text-4xl font-bold text-brand-primary mb-2">100%</p>
            <p class="text-gray-700">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Latest Insights (Blog Preview) Section -->
    <section class="py-16 md:py-24 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Latest Insights</h2>
        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Stay updated with real estate market trends, news, and expert insights.
        </p>
        <div v-if="blogPostsPending" class="text-center py-12 text-gray-500">Loading latest blog posts...</div>
        <div v-else-if="blogPostsError" class="text-center py-12 text-red-500 bg-red-50 p-4 rounded-lg">
          Error loading blog posts: {{ blogPostsError.data?.message || 'Could not fetch latest insights.' }}
        </div>
        <div v-else-if="latestBlogPosts.length" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- DYNAMICALLY RENDERED BlogCard components -->
          <BlogCard
            v-for="post in latestBlogPosts"
            :key="post.slug"             
            :title="post.title"
            :slug="post.slug"             
            :image="post.imageUrl"        
            :author="post.author"
            :date="post.createdAt"
            :excerpt="post.description"
          />
        </div>
        <div v-else class="text-center text-gray-600 text-lg py-10">
          No latest insights available.
        </div>
        <div class="text-center mt-12">
          <BaseButton to="/blog" text="View All Posts" variant="light" />
        </div>
      </div>
    </section>

    <!-- Call to Action Section (e.g., "Ready to Get Started?") -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready to Discuss Your Needs?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Reach out today for expert advice and personalized solutions.
        </p>
        <BaseButton to="/contact" text="Book a Free Consultation" variant="primary" /> <!-- UPDATED: Text -->
      </div>
    </section>

    <!-- Back to Top Button -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig, useAsyncData } from '#imports'; // ADDED useAsyncData
import { computed } from 'vue'; // Import computed from vue

// --- INTERFACE FOR BLOG POSTS ---
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  category: string | null;
  content: string;
}
// --- END INTERFACE ---

const config = useRuntimeConfig();

// --- FETCH LATEST BLOG POSTS ---
// Fetch 3 latest blog posts for the homepage preview
const { data: latestBlogPostsResponse, pending: blogPostsPending, error: blogPostsError } = await useAsyncData(
  'latestBlogPosts',
  () => $fetch('/api/posts', {
    params: {
      limit: 3 // Request only 3 posts for the homepage preview
    }
  }),
  {
    server: false, // Disabling SSR for blog posts to prevent database connection issues during build/prerender
    lazy: true, // Fetch posts asynchronously without blocking page navigation
  }
);

const latestBlogPosts = computed<BlogPost[]>(() => latestBlogPostsResponse.value?.posts || []);
// --- END FETCH LATEST BLOG POSTS ---

// Basic UseHead for standard meta tags
useHead({
  title: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}`, // UPDATED: Use runtimeConfig
    },
  ],
});

// UseUseoMeta for Open Graph and Twitter Card tags
useSeoMeta({
  title: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  ogTitle: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  description: 'Professional valuation and consultancy services for all your real estate needs in Kenya. Expertise in property valuation, investment advisory, asset management, and mortgage valuation.',
  ogDescription: 'Professional valuation and consultancy services for all your real estate needs in Kenya. Expertise in property valuation, investment advisory, asset management, and mortgage valuation.',
  ogImage: `${config.public.baseUrl}/images/default-hero-social.jpg`, // UPDATED: Use runtimeConfig
  ogUrl: `${config.public.baseUrl}`, // UPDATED: Use runtimeConfig
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Benchmark Valuers Ltd - Real Estate Consultancy',
  twitterDescription: 'Professional valuation and consultancy services for all your real estate needs in Kenya.',
  twitterImage: `${config.public.baseUrl}/images/default-hero-social.jpg`, // UPDATED: Use runtimeConfig
  twitterCreator: '@BenchmarkValuers',
});
</script>

<style>
/* Add any specific styles for index.vue if needed */
/* For animations, ensure you have Tailwind's keyframes configured if custom */
.animate-fade-in-up {
  animation: fade-in-up 0.7s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
  animation-delay: 0.3s;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>