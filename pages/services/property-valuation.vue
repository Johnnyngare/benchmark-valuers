<template>
  <div class="service-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Property Valuation</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Accurate, reliable, and timely property valuations for all your needs in Kenya.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Expert Valuation Services</h2>
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          <p>At Benchmark Valuers Ltd, we provide professional and independent property valuation services tailored to meet diverse client needs. Our certified valuers possess deep market knowledge and adhere to international valuation standards, ensuring comprehensive and precise reports.</p>
          
          <h3>Our Valuation Expertise Covers:</h3>
          <ul class="list-disc list-inside">
            <li>**Residential Properties:** Homes, apartments, and land for sale, purchase, or mortgage.</li>
            <li>**Commercial Properties:** Offices, retail spaces, warehouses, and industrial parks.</li>
            <li>**Agricultural Properties:** Farms, ranches, and land for various agricultural uses.</li>
            <li>**Specialized Assets:** Plant and machinery, development land, and income-generating properties.</li>
          </ul>

          <h3>Common Valuation Purposes:</h3>
          <ul class="list-disc list-inside">
            <li>Mortgage and financing applications</li>
            <li>Sale and purchase decisions</li>
            <li>Financial reporting and accounting</li>
            <li>Insurance claims</li>
            <li>Compulsory acquisition and compensation</li>
            <li>Rent reviews and lease renewals</li>
            <li>Estate planning and probate</li>
          </ul>
          <p>We pride ourselves on delivering transparent, well-researched, and timely valuation reports that empower our clients to make informed real estate decisions.</p>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/contact" class="inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark-blue transition-colors duration-300">
            Request a Valuation
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Need Accurate Property Valuations?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact our team today for professional and independent assessment services.
        </p>
        <BaseButton to="/contact" text="Contact Us" variant="primary" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();
definePageMeta({ ssr: false });
useHead({ title: 'Property Valuation - Benchmark Valuers' });
useSeoMeta({
  title: 'Property Valuation - Benchmark Valuers',
  ogTitle: 'Property Valuation - Benchmark Valuers',
  description: 'Expert property valuation services by Benchmark Valuers Ltd for accurate assessments of residential, commercial, and industrial properties in Kenya for various purposes.',
  ogDescription: 'Expert property valuation services by Benchmark Valuers Ltd for accurate assessments of residential, commercial, and industrial properties in Kenya for various purposes.',
  ogUrl: `${config.public.baseUrl}/services/property-valuation`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Property Valuation - Benchmark Valuers',
  twitterDescription: 'Expert property valuation services for accurate assessments.',
});
</script>