<template>
  <!-- THE FIX IS HERE: Added 'relative z-50' to lift the header above all page content -->
  <header class="bg-white shadow-md py-4 relative z-50">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <!-- UPDATED: Benchmark Logo to the BV one only -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img src="/images/logo-bv.png" alt="BV Logo" class="h-8">
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Home</NuxtLink>
        <!-- UPDATED: Rename Who We Are to About Us -->
        <NuxtLink to="/about" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">About Us</NuxtLink>
        
        <!-- --- CRITICAL FIX: Practice Areas Dropdown UI --- -->
        <div class="relative group">
          <button class="text-gray-600 hover:text-brand-primary focus:outline-none flex items-center transition-colors duration-200">
            Practice Areas <i class="fas fa-chevron-down ml-1 text-xs transition-transform duration-200 group-hover:rotate-180"></i>
          </button>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48 py-2 z-10">
            <!-- List all Services on the Practice Areas menu item as a dropdown; link each to its page -->
            <NuxtLink @click="closeMobileMenu" to="/services/property-valuation" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Property Valuation</NuxtLink>
            <NuxtLink @click="closeMobileMenu" to="/services/investment-advisory" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Investment Advisory</NuxtLink>
            <NuxtLink @click="closeMobileMenu" to="/services/asset-management" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Asset Management</NuxtLink>
            <NuxtLink @click="closeMobileMenu" to="/services/mortgage-valuation" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Mortgage Valuation</NuxtLink>
            <!-- Add other specific service links here as you create them -->
          </div>
        </div>
        <!-- --- END Practice Areas Dropdown UI --- -->

        <NuxtLink to="/blog" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Blog</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-600 hover:text-brand-primary transition-colors duration-200">Contact</NuxtLink>
        
        <!-- UPDATED: Request Valuation to Remove Quote -->
        <BaseButton to="/request-for-quote" text="Request Quote" variant="primary" /> <!-- Link to new RFQ page -->
        
        <!-- --- ADDED: Link to Book a Free Consultation Page (Desktop) --- -->
        <BaseButton to="/book-consultation" text="Book a Free Consultation" variant="secondary-outline" /> 
        <!-- --- END ADDED --- -->

        <div class="border-l border-gray-300 h-6"></div>
        
        <!-- --- CRITICAL FIX: Staff Login Button to be changed to Sign Out upon sign in --- -->
        <!-- Add background colour to Staff Login/Sign Out Button -->
        <NuxtLink
          v-if="!loggedIn"
          to="/admin/login"
          class="px-4 py-2 rounded-lg border border-transparent text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-sm"
        >
          Staff Login
        </NuxtLink>
        <button
          v-else
          @click="logout"
          class="px-4 py-2 rounded-lg border border-transparent text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 text-sm"
        >
          Sign Out
        </button>
        <!-- --- END CRITICAL FIX --- -->
      </nav>

      <!-- Mobile Menu Toggle & CTA -->
      <div class="md:hidden flex items-center space-x-4">
        <!-- UPDATED: Mobile CTA to "Book a Free Consultation" -->
        <BaseButton to="/book-consultation" text="Book a Free Consultation" variant="primary-mobile" /> 
        
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
          <NuxtLink @click="closeMobileMenu" to="/about" class="text-gray-800 hover:text-brand-primary">About Us</NuxtLink>
          
          <!-- Mobile Dropdown for Practice Areas -->
          <div class="relative">
            <button @click="toggleMobileDropdown('practiceAreas')" class="text-gray-800 hover:text-brand-primary focus:outline-none flex items-center justify-center w-full">
              Practice Areas <i :class="['fas ml-2 text-xl', mobileDropdowns.practiceAreas ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
            </button>
            <div v-if="mobileDropdowns.practiceAreas" class="flex flex-col mt-2 pl-4 text-xl">
              <NuxtLink @click="closeMobileMenu" to="/services/property-valuation" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Property Valuation</NuxtLink>
              <NuxtLink @click="closeMobileMenu" to="/services/investment-advisory" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Investment Advisory</NuxtLink>
              <NuxtLink @click="closeMobileMenu" to="/services/asset-management" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Asset Management</NuxtLink>
              <NuxtLink @click="closeMobileMenu" to="/services/mortgage-valuation" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mortgage Valuation</NuxtLink>
            </div>
          </div>
          
          <NuxtLink @click="closeMobileMenu" to="/blog" class="text-gray-800 hover:text-brand-primary">Blog</NuxtLink>
          <NuxtLink @click="closeMobileMenu" to="/contact" class="text-gray-800 hover:text-brand-primary">Contact</NuxtLink>
          
          <BaseButton @click="closeMobileMenu" to="/book-consultation" text="Book a Free Consultation" variant="primary" class="mt-4" /> 
          
          <NuxtLink
            v-if="!loggedIn"
            @click="closeMobileMenu"
            to="/admin/login"
            class="text-gray-500 hover:text-brand-primary text-lg mt-8"
          >
            Staff Login
          </NuxtLink>
          <button
            v-else
            @click="logoutAndCloseMobileMenu"
            class="px-4 py-2 rounded-lg border border-transparent text-white bg-red-500 hover:bg-red-600 transition-colors duration-300 text-lg mt-8"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const isMobileMenuOpen = ref(false);
const mobileDropdowns = ref({
  practiceAreas: false,
});

const { loggedIn, logout } = useAuth();

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    mobileDropdowns.value.practiceAreas = false;
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  mobileDropdowns.value.practiceAreas = false;
};

const toggleMobileDropdown = (dropdownName: 'practiceAreas') => {
  mobileDropdowns.value[dropdownName] = !mobileDropdowns.value[dropdownName];
};

const logoutAndCloseMobileMenu = () => {
  logout();
  closeMobileMenu();
};

const router = useRouter();

watch(router.currentRoute, () => {
  closeMobileMenu();
});
</script>