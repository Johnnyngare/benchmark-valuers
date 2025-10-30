<!-- pages/who-we-are.vue -->
<template>
  <div class="who-we-are-page">
    <!-- Hero Section for "Who We Are" -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Who We Are</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          A team of dedicated professionals committed to delivering excellence in real estate valuation and consultancy services across Kenya.
        </p>
      </div>
    </section>

    <!-- About Benchmark Valuers Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="text-content">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Benchmark Valuers</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            Benchmark Valuers Ltd is a premier real estate valuation and consultancy firm based in Nairobi, Kenya. We specialize in providing comprehensive, market-driven solutions to clients across residential, commercial, and industrial sectors.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed mb-4">
            Our team comprises highly qualified and experienced professionals who are committed to delivering accurate, reliable, and timely services. We adhere to international valuation standards and best practices, ensuring that our clients receive the highest quality service.
          </p>
          <p class="text-lg text-gray-700 leading-relaxed">
            With a deep understanding of the Kenyan real estate market and years of experience, we have built a reputation for excellence and integrity in all our dealings.
          </p>
        </div>
        <div class="image-section">
          <!-- Placeholder for an engaging image, perhaps of the team or a project -->
          <NuxtImg
            src="/images/about-team-meeting.jpg"
            alt="Benchmark Valuers Team Meeting"
            class="rounded-lg shadow-xl w-full h-auto"
            loading="lazy"
            placeholder
          />
        </div>
      </div>
    </section>

    <!-- Mission, Vision, Values Section -->
    <section class="py-16 md:py-24 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Core Principles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-brand-primary text-5xl mb-4"><i class="fas fa-bullseye"></i></div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
            <p class="text-gray-700">To provide accurate, professional, and timely real estate valuation and consultancy services that empower our clients to make informed decisions.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-brand-primary text-5xl mb-4"><i class="fas fa-eye"></i></div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
            <p class="text-gray-700">To be Kenya's most trusted real estate valuation firm, recognized for our integrity, expertise, and innovation in East Africa.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <div class="text-brand-primary text-5xl mb-4"><i class="fas fa-handshake"></i></div>
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Our Values</h3>
            <ul class="list-none space-y-2 text-gray-700 text-left mx-auto max-w-xs">
              <li class="flex items-center"><i class="fas fa-check-circle text-brand-primary mr-2"></i> Integrity & Transparency</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-brand-primary mr-2"></i> Professional Excellence</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-brand-primary mr-2"></i> Client-Centric Service</li>
              <li class="flex items-center"><i class="fas fa-check-circle text-brand-primary mr-2"></i> Continuous Innovation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Team Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Meet Our Team</h2>
        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Experienced professionals dedicated to delivering exceptional service.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Example Team Member Cards -->
          <TeamMemberCard
            name="John Kamau"
            role="Managing Director"
            image="/images/team-john.jpg"
          />
          <TeamMemberCard
            name="Sarah Wanjiru"
            role="Chief Valuer"
            image="/images/team-sarah.jpg"
          />
          <TeamMemberCard
            name="David Omondi"
            role="Senior Consultant"
            image="/images/team-david.jpg"
          />
          <TeamMemberCard
            name="Grace Muthoni"
            role="Legal Advisor"
            image="/images/team-grace.jpg"
          />
        </div>
      </div>
    </section>

    <!-- Certifications & Affiliations Section (with icons) -->
    <section class="py-16 md:py-24 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Certifications & Affiliations</h2>
        <p class="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Recognized and accredited by leading professional bodies.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <!-- Cards with icons for certifications/affiliations -->
          <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow duration-300 text-center">
            <i class="fas fa-balance-scale-left text-4xl text-brand-primary mb-2"></i> 
            <p class="text-lg font-medium text-gray-700">Institution of Surveyors of Kenya</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow duration-300 text-center">
            <i class="fas fa-university text-4xl text-brand-primary mb-2"></i> 
            <p class="text-lg font-medium text-gray-700">Real Estate Board</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow duration-300 text-center">
            <i class="fas fa-certificate text-4xl text-brand-primary mb-2"></i> 
            <p class="text-lg font-medium text-gray-700">RICS</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow duration-300 text-center">
            <i class="fas fa-users-cog text-4xl text-brand-primary mb-2"></i> 
            <p class="text-lg font-medium text-gray-700">Kenya Valuers Association</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section (reused from homepage) -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Work With Professionals You Can Trust</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Let our experienced team help you with your property valuation needs.
        </p>
        <BaseButton to="/contact" text="Request Valuation" variant="primary" />
        <BaseButton to="/services" text="View Our Services" variant="secondary-outline" class="ml-4" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from 'nuxt/app';

// Page specific meta for SEO
useHead({
  title: 'Who We Are - Benchmark Valuers Ltd | Our Team & Credentials',
  link: [
    {
      rel: 'canonical',
      href: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/who-we-are`,
    },
  ],
});

// ADVANCED SEO TAGS for "Who We Are" page
useSeoMeta({
  title: 'Who We Are - Benchmark Valuers Ltd | Our Mission, Vision, and Team',
  ogTitle: 'Who We Are - Benchmark Valuers Ltd | Our Mission, Vision, and Team',
  description: 'Learn more about Benchmark Valuers Ltd, our mission, vision, values, expert team, and professional certifications in real estate valuation and consultancy in Kenya.',
  ogDescription: 'Learn more about Benchmark Valuers Ltd, our mission, vision, values, expert team, and professional certifications in real estate valuation and consultancy in Kenya.',
  ogImage: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-about-social.jpg`, // A specific social image for the about page
  ogUrl: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/who-we-are`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Who We Are - Benchmark Valuers Ltd',
  twitterDescription: 'Meet the expert team and learn about the core principles of Benchmark Valuers, Kenya.',
  twitterImage: `${process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/images/default-about-social.jpg`,
  twitterCreator: '@BenchmarkValuers',
});
</script>