<!-- pages/index.vue -->
<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-brand-secondary-dark to-blue-800 text-white py-24 md:py-32 overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-30" style="background-image: url('/images/hero-bg.jpg'); background-size: cover; background-position: center;"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
          Market-driven real estate consultancy services
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90 animate-fade-in">
          Professional valuation and consultancy services for all your real estate needs in Kenya.
        </p>
        <div class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <BaseButton to="/contact" text="Request Valuation" variant="primary" />
          <BaseButton to="/services" text="Our Services" variant="secondary-outline" />
        </div>
      </div>
    </section>

    <!-- Services Overview Section -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Our Core Services</h2>
        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Comprehensive real estate valuation and consultancy solutions tailored to your needs.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon="fas fa-chart-pie"
            title="Property Valuation"
            description="Accurate market valuations for residential, commercial, and industrial properties."
            link="/services"
          />
          <ServiceCard
            icon="fas fa-lightbulb"
            title="Investment Advisory"
            description="Strategic guidance for real estate investment and market analysis."
            link="/services"
          />
          <ServiceCard
            icon="fas fa-building"
            title="Property Management"
            description="Comprehensive management of real estate assets to maximize value and returns."
            link="/services"
          />
        </div>
        <div class="text-center mt-12">
          <BaseButton to="/services" text="View All Services" variant="light" />
        </div>
      </div>
    </section>

    <!-- Who We Are Preview Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div class="md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Who We Are</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            Benchmark Valuers Ltd is a leading real estate valuation and consultancy firm in Kenya,
            providing market-driven solutions to clients across various sectors.
            With years of experience and a team of certified professionals, we deliver accurate,
            reliable, and timely services that meet international standards.
          </p>
          <BaseButton to="/who-we-are" text="Learn More About Us" variant="primary" />
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Placeholder for 3 latest blog posts -->
          <!-- These will be replaced with actual fetched data from @nuxt/content -->
          <BlogCard
            title="Understanding Property Valuation Methods in Kenya"
            slug="understanding-property-valuation-methods"
            image="/images/blog-typewriter.jpg"
            author="Sarah Wanjiru"
            date="2025-03-10T10:00:00Z"
            excerpt="A comprehensive guide to different valuation approaches including the comparative method, income approach, and cost approach."
          />
          <BlogCard
            title="Nairobi Property Market Trends 2025"
            slug="nairobi-property-market-trends-2025"
            image="/images/blog-nairobi-road.jpg"
            author="John Kamau"
            date="2025-03-15T12:30:00Z"
            excerpt="An in-depth analysis of the current market conditions, price movements, and future projections in the Nairobi real estate landscape."
          />
          <BlogCard
            title="Investment Property Analysis: What to Look For"
            slug="investment-property-analysis"
            image="/images/blog-apartment-building.jpg"
            author="David Omondi"
            date="2025-03-05T09:00:00Z"
            excerpt="Essential factors to consider when evaluating an investment property to ensure maximum returns and long-term profitability."
          />
        </div>
        <div class="text-center mt-12">
          <BaseButton to="/blog" text="View All Posts" variant="light" />
        </div>
      </div>
    </section>

    <!-- Call to Action Section (e.g., "Ready to Get Started?") -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready to Get Started?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact us today for professional valuation and consultancy services.
        </p>
        <BaseButton to="/contact" text="Request a Consultation" variant="primary" />
      </div>
    </section>
  </div>
</template>

<!-- pages/index.vue (script setup section) -->
<script setup lang="ts">
import { useHead, useSeoMeta } from '#imports'; // <-- IMPORT useSeoMeta

// Basic UseHead for standard meta tags
useHead({
  title: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  link: [
    {
      rel: 'canonical',
      href: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
    },
  ],
});

// UseUseoMeta for Open Graph and Twitter Card tags
useSeoMeta({
  title: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  ogTitle: 'Benchmark Valuers Ltd - Market-driven Real Estate Consultancy Services in Kenya',
  description: 'Professional valuation and consultancy services for all your real estate needs in Kenya. Expertise in property valuation, investment advisory, asset management, and mortgage valuation.',
  ogDescription: 'Professional valuation and consultancy services for all your real estate needs in Kenya. Expertise in property valuation, investment advisory, asset management, and mortgage valuation.',
  ogImage: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-hero-social.jpg`, // Provide a default image for social sharing
  ogUrl: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Benchmark Valuers Ltd - Real Estate Consultancy',
  twitterDescription: 'Professional valuation and consultancy services for all your real estate needs in Kenya.',
  twitterImage: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-hero-social.jpg`,
  twitterCreator: '@BenchmarkValuers', // Your company's Twitter handle
});
</script>