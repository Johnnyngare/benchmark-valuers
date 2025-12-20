<template>
  <div class="service-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Asset Management</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Maximize the value and returns of your real estate assets with our expert management.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Comprehensive Real Estate Asset Management</h2>
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          <p>Benchmark Valuers Ltd provides holistic real estate asset management services, ensuring your investments perform optimally. We manage your property as a strategic asset, focusing on enhancing value, optimizing returns, and minimizing risks over its lifecycle.</p>
          
          <h3>Our Asset Management Services Include:</h3>
          <ul class="list-disc list-inside">
            <li>**Performance Monitoring:** Continuous tracking and analysis of asset performance against market benchmarks and financial goals.</li>
            <li>**Lease & Tenant Management:** Strategic tenant acquisition, retention, lease negotiations, and rent collection to ensure consistent occupancy and income.</li>
            <li>**Property Maintenance & Operations:** Oversight of maintenance, repairs, and operational efficiency to preserve asset value and tenant satisfaction.</li>
            <li>**Financial Reporting & Budgeting:** Detailed financial analysis, budgeting, and transparent reporting to keep you informed of your asset's health.</li>
            <li>**Risk Management:** Identification and mitigation of potential risks, ensuring compliance with regulatory requirements.</li>
            <li>**Value Enhancement Strategies:** Implementing strategies such as refurbishment, redevelopment, or repositioning to increase asset value and market appeal.</li>
          </ul>

          <p>Let us handle the complexities of property management while you enjoy optimized returns and peace of mind.</p>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/contact" class="inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark-blue transition-colors duration-300">
            Manage My Assets
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Optimize Your Property Portfolio?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Discover how our expert asset management can enhance your investment value.
        </p>
        <BaseButton to="/contact" text="Book a Consultation" variant="primary" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();
definePageMeta({ ssr: false });
useHead({ title: 'Asset Management - Benchmark Valuers' });
useSeoMeta({
  title: 'Asset Management - Benchmark Valuers',
  ogTitle: 'Asset Management - Benchmark Valuers',
  description: 'Expert real estate asset management services by Benchmark Valuers Ltd to maximize property value, optimize returns, and minimize risks for investors in Kenya.',
  ogDescription: 'Expert real estate asset management services by Benchmark Valuers Ltd to maximize property value, optimize returns, and minimize risks for investors in Kenya.',
  ogUrl: `${config.public.baseUrl}/services/asset-management`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Asset Management - Benchmark Valuers',
  twitterDescription: 'Maximize real estate value and returns with expert asset management.',
});
</script>