<template>
  <div class="service-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Mortgage Valuation</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Reliable property valuations for mortgage financing and lending institutions.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Accurate Valuations for Mortgage & Lending</h2>
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          <p>Benchmark Valuers Ltd specializes in providing precise and compliant mortgage valuation services crucial for financial institutions and borrowers. Our independent valuations ensure accurate property assessments for loan security, refinancing, and other lending requirements.</p>
          
          <h3>Our Mortgage Valuation Services Cater To:</h3>
          <ul class="list-disc list-inside">
            <li>**Banks and Lending Institutions:** Providing objective property value assessments for loan underwriting.</li>
            <li>**Property Developers:** Valuing assets for development financing and project security.</li>
            <li>**Individual Borrowers:** Independent valuations for personal mortgage applications and refinancing.</li>
            <li>**Legal Firms:** Expert reports for property-related legal proceedings involving financial security.</li>
          </ul>

          <h3>Key Aspects of Our Mortgage Valuations:</h3>
          <ul class="list-disc list-inside">
            <li>**Compliance:** Adherence to regulatory requirements and banking guidelines.</li>
            <li>**Market Analysis:** In-depth review of local property market conditions affecting value.</li>
            <li>**Risk Assessment:** Identification of factors that could impact property value and loan security.</li>
            <li>**Timely Reporting:** Efficient delivery of comprehensive reports to meet tight financial deadlines.</li>
          </ul>
          <p>We understand the critical role of accurate valuations in the mortgage process, and our commitment to integrity and professionalism ensures trusted results for all stakeholders.</p>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/contact" class="inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark-blue transition-colors duration-300">
            Request a Mortgage Valuation
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Secure Your Financing with Confidence?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact us for professional mortgage valuation services tailored to your lending needs.
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
useHead({ title: 'Mortgage Valuation - Benchmark Valuers' });
useSeoMeta({
  title: 'Mortgage Valuation - Benchmark Valuers',
  ogTitle: 'Mortgage Valuation - Benchmark Valuers',
  description: 'Reliable property valuations for mortgage financing and lending institutions by Benchmark Valuers Ltd, ensuring accurate assessments and loan security in Kenya.',
  ogDescription: 'Reliable property valuations for mortgage financing and lending institutions by Benchmark Valuers Ltd, ensuring accurate assessments and loan security in Kenya.',
  ogUrl: `${config.public.baseUrl}/services/mortgage-valuation`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Mortgage Valuation - Benchmark Valuers',
  twitterDescription: 'Accurate valuations for mortgage financing needs.',
});
</script>