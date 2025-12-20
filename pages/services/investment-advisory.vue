<template>
  <div class="service-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Investment Advisory</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Strategic guidance for informed real estate investment decisions and portfolio growth.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Unlock Your Real Estate Investment Potential</h2>
        <div class="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          <p>Benchmark Valuers Ltd offers comprehensive investment advisory services designed to help you navigate the complexities of the real estate market. Our experienced consultants provide strategic insights and data-driven analysis to maximize your returns and secure your investments.</p>
          
          <h3>Our Investment Advisory Services Include:</h3>
          <ul class="list-disc list-inside">
            <li>**Market Research & Analysis:** In-depth reports on market trends, demand-supply dynamics, and growth forecasts across different sectors.</li>
            <li>**Feasibility Studies:** Comprehensive assessment of project viability, risk factors, and potential profitability.</li>
            <li>**Portfolio Strategy:** Tailored advice for building, optimizing, and diversifying your real estate investment portfolio.</li>
            <li>**Due Diligence:** Thorough examination of properties and transactions to identify potential risks and opportunities.</li>
            <li>**Exit Strategies:** Guidance on timing and methods for divesting assets to achieve optimal returns.</li>
          </ul>

          <p>Whether you are a first-time investor or managing a large portfolio, our expert guidance ensures your decisions are grounded in sound market intelligence and strategic foresight.</p>
        </div>
        <div class="text-center mt-12">
          <NuxtLink to="/contact" class="inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark-blue transition-colors duration-300">
            Get Investment Advice
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready to Grow Your Portfolio?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact our advisors today for personalized real estate investment strategies.
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
useHead({ title: 'Investment Advisory - Benchmark Valuers' });
useSeoMeta({
  title: 'Investment Advisory - Benchmark Valuers',
  ogTitle: 'Investment Advisory - Benchmark Valuers',
  description: 'Strategic real estate investment advisory services by Benchmark Valuers Ltd for market analysis, feasibility studies, and portfolio optimization in Kenya.',
  ogDescription: 'Strategic real estate investment advisory services by Benchmark Valuers Ltd for market analysis, feasibility studies, and portfolio optimization in Kenya.',
  ogUrl: `${config.public.baseUrl}/services/investment-advisory`,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Investment Advisory - Benchmark Valuers',
  twitterDescription: 'Strategic guidance for real estate investment decisions.',
});
</script>