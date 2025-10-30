<template>
  <footer class="bg-gray-800 text-gray-300 py-10">
    <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Company Info -->
      <div>
        <NuxtLink to="/" class="flex items-center space-x-2 text-xl font-bold text-white mb-4">
          <img src="/images/logo-bv.png" alt="Benchmark Valuers Ltd Logo" class="h-8">
          <span class="hidden sm:block">BENCHMARK VALUERS LTD</span>
        </NuxtLink>
        <p class="text-sm">
          Professional property valuation and real estate consultancy services in Kenya.
        </p>
        <div class="flex space-x-4 mt-4 text-lg">
          <a href="#" aria-label="Facebook" class="hover:text-brand-primary transition-colors duration-200"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter" class="hover:text-brand-primary transition-colors duration-200"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="LinkedIn" class="hover:text-brand-primary transition-colors duration-200"><i class="fab fa-linkedin-in"></i></a>
          <a href="#" aria-label="Instagram" class="hover:text-brand-primary transition-colors duration-200"><i class="fab fa-instagram"></i></a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/" class="hover:text-brand-primary transition-colors duration-200">Home</NuxtLink></li>
          <li><NuxtLink to="/who-we-are" class="hover:text-brand-primary transition-colors duration-200">Who We Are</NuxtLink></li>
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Our Services</NuxtLink></li>
          <li><NuxtLink to="/blog" class="hover:text-brand-primary transition-colors duration-200">Blog</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-brand-primary transition-colors duration-200">Contact</NuxtLink></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Contact</h3>
        <address class="not-italic space-y-2">
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-map-marker-alt"></i></span> Madonna House Annex, Suite A409, 4th Floor, Westlands, Nairobi, Kenya</p>
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-phone"></i></span> +254 794 318 971</p>
          <p class="flex items-center"><span class="text-brand-primary mr-2"><i class="fas fa-envelope"></i></span> info@benchmarkvaluers.co.ke</p>
        </address>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Services</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Property Valuation</NuxtLink></li>
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Investment Advisory</NuxtLink></li>
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Asset Management</NuxtLink></li>
          <li><NuxtLink to="/services" class="hover:text-brand-primary transition-colors duration-200">Mortgage Valuation</NuxtLink></li>
        </ul>
      </div>
    </div>
    
    <!-- --- REVISED FINAL SECTION --- -->
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
// No script logic is needed for this component.
</script>