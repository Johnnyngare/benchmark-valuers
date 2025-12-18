<!-- pages/terms-of-usage.vue -->
<template>
  <section class="container mx-auto px-4 py-16 md:py-24 bg-brand-light-bg min-h-screen">
    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">Terms of Usage</h1>
    <div class="prose prose-lg max-w-none mx-auto">
      <p>Welcome to Benchmark Valuers Ltd's Terms of Usage. By accessing or using our website, you agree to comply with and be bound by these terms and conditions.</p>
      <h2>1. Acceptance of Terms</h2>
      <p>By using our services, you signify your agreement to these terms. If you do not agree, please do not use our services.</p>
      <h2>2. Services Provided</h2>
      <p>Benchmark Valuers Ltd provides professional property valuation, investment advisory, asset management, and other related real estate consultancy services.</p>
      <h2>3. User Obligations</h2>
      <ul>
        <li>Users must provide accurate and truthful information.</li>
        <li>Users must not use the website for any unlawful purposes.</li>
        <li>Users are responsible for maintaining the confidentiality of their account information.</li>
      </ul>
      <h2>4. Intellectual Property</h2>
      <p>All content on this website, including text, graphics, logos, and images, is the property of Benchmark Valuers Ltd and protected by intellectual property laws.</p>
      <h2>5. Limitation of Liability</h2>
      <p>Benchmark Valuers Ltd will not be liable for any damages arising from the use or inability to use this website or its services.</p>
      <h2>6. Governing Law</h2>
      <p>These terms shall be governed by and construed in accordance with the laws of Kenya.</p>
      <h2>7. Changes to Terms</h2>
      <p>We reserve the right to modify these terms at any time. Your continued use of the website after any such changes constitutes your acceptance of the new terms.</p>
      <p>Last updated: December 16, {{ new Date().getFullYear() }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();
useHead({ title: 'Terms of Usage | Benchmark Valuers' });
useSeoMeta({
  title: 'Terms of Usage | Benchmark Valuers',
  description: 'Review the terms and conditions for using Benchmark Valuers Ltd website and services.',
  ogUrl: `${config.public.baseUrl}/terms-of-usage`,
  ogType: 'website',
});
</script>