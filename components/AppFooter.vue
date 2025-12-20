<template>
  <footer class="bg-gray-800 text-gray-300 py-10">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8"> 
      <div>
        <NuxtLink to="/" class="flex items-center space-x-2 text-xl font-bold text-white mb-4">
          <img src="/images/logo-bv.png" alt="BV Logo" class="h-8">
        </NuxtLink>
        <p class="text-sm">
          Professional property valuation and real estate consultancy services in Kenya.
        </p>
        <div class="flex space-x-4 mt-4 text-lg">
          <a href="https://facebook.com/benchmarkvaluers" target="_blank" rel="noopener" aria-label="Facebook" class="hover:text-brand-primary transition-colors duration-200">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/BenchmarkValuers" target="_blank" rel="noopener" aria-label="Twitter" class="hover:text-brand-primary transition-colors duration-200">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com/company/benchmark-valuers" target="_blank" rel="noopener" aria-label="LinkedIn" class="hover:text-brand-primary transition-colors duration-200">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com/benchmark_valuers" target="_blank" rel="noopener" aria-label="Instagram" class="hover:text-brand-primary transition-colors duration-200">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/" class="hover:text-brand-primary transition-colors duration-200">Home</NuxtLink></li>
          <li><NuxtLink to="/about" class="hover:text-brand-primary transition-colors duration-200">About Us</NuxtLink></li>
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Practice Areas</NuxtLink></li>
          <li><NuxtLink to="/blog" class="hover:text-brand-primary transition-colors duration-200">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-brand-primary transition-colors duration-200">Contact</NuxtLink></li>
          <li><NuxtLink to="/terms-of-usage" class="hover:text-brand-primary transition-colors duration-200">Terms of Usage</NuxtLink></li>
          <li><NuxtLink to="/privacy-policy" class="hover:text-brand-primary transition-colors duration-200">Privacy Policy</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Contact</h3>
        <address class="not-italic space-y-2">
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-map-marker-alt"></i></span> Madonna House Annex, Suite A409, 4th Floor, Westlands, Nairobi, Kenya</p>
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-phone"></i></span> +254 794 318 971</p>
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-envelope"></i></span> info@benchmarkvaluers.co.ke</p>
        </address>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Practice Areas</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/services/property-valuation" class="hover:text-brand-primary transition-colors duration-200">Property Valuation</NuxtLink></li>
          <li><NuxtLink to="/services/investment-advisory" class="hover:text-brand-primary transition-colors duration-200">Investment Advisory</NuxtLink></li>
          <li><NuxtLink to="/services/asset-management" class="hover:text-brand-primary transition-colors duration-200">Asset Management</NuxtLink></li>
          <li><NuxtLink to="/services/mortgage-valuation" class="hover:text-brand-primary transition-colors duration-200">Mortgage Valuation</NuxtLink></li>
        </ul>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Newsletter</h3>
        <p class="text-sm mb-4">Subscribe to our newsletter for the latest insights.</p>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col space-y-3">
          <input
            type="email"
            v-model="newsletterEmail"
            placeholder="Your email address"
            required
            class="px-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <button
            type="submit"
            :disabled="newsletterLoading"
            class="bg-brand-primary text-white font-bold py-2 px-4 rounded-md hover:bg-brand-dark-blue transition-colors duration-300"
          >
            {{ newsletterLoading ? 'Subscribing...' : 'Subscribe' }}
          </button>
          <p v-if="newsletterSuccess" class="text-green-500 text-sm mt-2">Subscribed!</p>
          <p v-if="newsletterError" class="text-red-500 text-sm mt-2">Error subscribing.</p>
        </form>
      </div>

    </div>
    
    <div class="mt-8 pt-8 border-t border-gray-700 text-center">
      <p class="text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} Benchmark Valuers Ltd. All rights reserved.
      </p>
      <p class="text-xs text-gray-500 mt-2">
        Developed by Aegir Consult
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#imports'; 

const newsletterEmail = ref('');
const newsletterLoading = ref(false);
const newsletterSuccess = ref(false);
const newsletterError = ref(false);

const nuxtApp = useNuxtApp(); 
const toast = nuxtApp.$toast; 
async function subscribeNewsletter() {
  newsletterLoading.value = true;
  newsletterSuccess.value = false;
  newsletterError.value = false;

  try {
    const response = await $fetch<Record<string, any>>('/api/newsletter-subscribe', {
      method: 'POST',
      body: { email: newsletterEmail.value },
    });

    if (response.status === 'success') {
      newsletterSuccess.value = true;
      newsletterEmail.value = '';
      toast.success('Subscribed to newsletter!');
    } else {
      newsletterError.value = true;
      toast.error(response?.message || 'Failed to subscribe.');
    }
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    newsletterError.value = true;
    toast.error(error.data?.message || 'Error subscribing to newsletter.');
  } finally {
    newsletterLoading.value = false;
  }
}
</script>