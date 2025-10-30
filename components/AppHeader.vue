<!-- components/AppHeader.vue -->
<template>
  <!-- THE FIX IS HERE: Added 'relative z-50' to lift the header above all page content -->
  <header class="bg-white shadow-md py-4 relative z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <!-- Corrected Logo/Brand Name to use the image -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/images/logo-bv.png" alt="Benchmark Valuers Ltd Logo" class="h-8 md:h-10">
        <span class="hidden sm:block text-xl font-bold text-gray-800">BENCHMARK VALUERS LTD</span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Home</NuxtLink>
        <NuxtLink to="/who-we-are" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Who We Are</NuxtLink>
        <NuxtLink to="/services" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Our Services</NuxtLink>
        <NuxtLink to="/blog" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Blog</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Contact</NuxtLink>
        <BaseButton to="/contact" text="Request Valuation" variant="primary" />
        <div class="border-l border-gray-300 h-6"></div>
        <NuxtLink to="/admin/login" class="text-gray-500 hover:text-brand-primary text-sm">Staff Login</NuxtLink>
      </nav>

      <!-- Mobile Menu Toggle & CTA -->
      <div class="md:hidden flex items-center space-x-4">
        <BaseButton to="/contact" text="Request Valuation" variant="primary-mobile" />
        <button @click="toggleMobileMenu" class="text-gray-600 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 md:hidden">
        <button @click="toggleMobileMenu" class="absolute top-4 right-4 text-gray-600 focus:outline-none">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <nav class="flex flex-col space-y-6 text-2xl">
          <NuxtLink @click="closeMobileMenu" to="/" class="text-gray-800 hover:text-brand-primary">Home</NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/who-we-are" class="text-gray-800 hover:text-brand-primary">Who We Are</NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/services" class="text-gray-800 hover:text-brand-primary">Our Services</NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/blog" class="text-gray-800 hover:text-brand-primary">Blog</NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/contact" class="text-gray-800 hover:text-brand-primary">Contact</NuxtLink>
          <BaseButton @click="closeMobileMenu" to="/contact" text="Request Valuation" variant="primary" class="mt-4" />
          <NuxtLink @click="closeMobileMenu" to="/admin/login" class="text-gray-500 hover:text-brand-primary text-lg mt-8">Staff Login</NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const isMobileMenuOpen = ref(false);
const { loggedIn } = useAuth();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const router = useRouter();
router.afterEach(() => {
  closeMobileMenu();
});
</script>