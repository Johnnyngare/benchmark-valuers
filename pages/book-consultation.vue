<template>
  <div class="book-consultation-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Book a Free Consultation</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Schedule your free consultation with our expert team directly online.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-6xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Schedule Your Appointment</h2>
        <p class="text-center text-lg text-gray-700 mb-12">
          Please use the calendar below to find an available time that works for you.
        </p>
        <!-- --- EMBED MICROSOFT BOOKINGS IFRAME --- -->
        <div class="relative w-full overflow-hidden" style="padding-top: 56.25%;">
          <iframe
            src="YOUR_MICROSOFT_BOOKINGS_LINK_HERE"
            class="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-xl"
            title="Microsoft Bookings Calendar"
            loading="lazy"
          ></iframe>
        </div>
        <!-- --- END EMBED --- -->
        <p class="text-sm text-gray-500 text-center mt-8">
          *If you experience any issues with the booking calendar, please contact us directly via our <NuxtLink to="/contact" class="text-brand-primary hover:underline">Contact Page</NuxtLink>.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();
definePageMeta({ ssr: false });
useHead({ title: 'Book a Free Consultation - Benchmark Valuers' });
useSeoMeta({
  title: 'Book a Free Consultation - Benchmark Valuers',
  ogTitle: 'Book a Free Consultation - Benchmark Valuers',
  description: 'Schedule a free consultation with Benchmark Valuers Ltd experts for real estate valuation, investment advisory, and asset management services in Kenya.',
  ogDescription: 'Schedule a free consultation with Benchmark Valuers Ltd experts for real estate valuation, investment advisory, and asset management services in Kenya.',
  ogUrl: `${config.public.baseUrl}/book-consultation`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Book a Free Consultation - Benchmark Valuers',
  twitterDescription: 'Schedule your expert real estate consultation online.',
});
</script>