<!-- pages/privacy-policy.vue -->
<template>
  <section class="container mx-auto px-4 py-16 md:py-24 bg-brand-light-bg min-h-screen">
    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center">Privacy Policy</h1>
    <div class="prose prose-lg max-w-none mx-auto">
      <p>Welcome to Benchmark Valuers Ltd's Privacy Policy. We are committed to protecting your personal information and your right to privacy.</p>
      <h2>1. Information We Collect</h2>
      <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.</p>
      <h3>Personal Information Provided by You</h3>
      <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following:</p>
      <ul>
        <li>Names</li>
        <li>Phone numbers</li>
        <li>Email addresses</li>
        <li>Mailing addresses</li>
        <li>Contact preferences</li>
      </ul>
      <h2>2. How We Use Your Information</h2>
      <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
      <ul>
        <li>To facilitate account creation and logon process.</li>
        <li>To send you marketing and promotional communications.</li>
        <li>To deliver targeted advertising to you.</li>
        <li>To manage your accounts.</li>
        <li>To deliver services to the user.</li>
        <li>To respond to user inquiries/offer support to users.</li>
      </ul>
      <h2>3. Will Your Information Be Shared With Anyone?</h2>
      <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
      <h2>4. How Long Do We Keep Your Information?</h2>
      <p>We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law.</p>
      <h2>5. How Do We Keep Your Information Safe?</h2>
      <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.</p>
      <h2>6. Your Privacy Rights</h2>
      <p>You have rights regarding your privacy. You may at any time review or change the information in your account or terminate your account.</p>
      <h2>7. Do We Make Updates to This Policy?</h2>
      <p>Yes, we will update this policy as necessary to stay compliant with relevant laws. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      <p>Last updated: December 16, {{ new Date().getFullYear() }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, useRuntimeConfig } from '#imports';
const config = useRuntimeConfig();
useHead({ title: 'Privacy Policy | Benchmark Valuers' });
useSeoMeta({
  title: 'Privacy Policy | Benchmark Valuers',
  description: 'Review the privacy policy for Benchmark Valuers Ltd regarding collection, use, and protection of personal information.',
  ogUrl: `${config.public.baseUrl}/privacy-policy`,
  ogType: 'website',
});
</script>