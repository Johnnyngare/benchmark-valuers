<!-- pages/services.vue -->
<template>
  <div class="our-services-page">
    <!-- Page Hero Section -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Comprehensive real estate valuation and consultancy solutions tailored to meet your unique needs.
        </p>
      </div>
    </section>

    <!-- Main Services Content -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Tailored Solutions for Your Property Needs</h2>

        <!-- Service Block 1: Property Valuations -->
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 last:mb-0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div class="image-or-icon-side flex justify-center md:justify-start">
              <div class="text-brand-primary text-6xl md:text-7xl p-4 rounded-full bg-blue-50/50 flex-shrink-0">
                <i class="fas fa-file-invoice-dollar"></i> <!-- Icon for valuation -->
              </div>
            </div>
            <div class="text-content-side">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Property Valuations for Real Estate and Assets</h3>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                We provide comprehensive property valuation services for residential, commercial, and industrial properties across Kenya. Our valuations are conducted by certified professionals using internationally recognized methodologies.
              </p>
              <ul class="list-none space-y-3 text-gray-700 text-lg mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Mortgage acquisition and loan security valuations</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Sale/Purchase purposes and land acquisitions</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Rental assessments and investment analysis</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Valuations for financial reporting and insurance purposes</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Valuations for mergers, acquisitions, and succession planning</li>
              </ul>
              <BaseButton to="/contact" text="Request Valuation Service" variant="primary" />
            </div>
          </div>
        </div>

        <!-- Service Block 2: Property & Facilities Management -->
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 last:mb-0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div class="text-content-side md:order-2"> <!-- Order changed for visual variety -->
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Property and Facilities Management</h3>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                With Benchmark Valuers, your property and facilities will be in the hands of professionals. We offer quality property management in Kenya, and safeguard good return on investment for you. Our services include:
              </p>
              <ul class="list-none space-y-3 text-gray-700 text-lg mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Tenant sourcing, vetting, and selection</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Lease administration, rent collection, and statements</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Service charge account administration and financial reporting</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Property maintenance coordination and repair management</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Legal compliance management and advisory</li>
              </ul>
              <BaseButton to="/contact" text="Request Management Service" variant="primary" />
            </div>
            <div class="image-or-icon-side flex justify-center md:justify-start md:order-1">
              <div class="text-brand-primary text-6xl md:text-7xl p-4 rounded-full bg-blue-50/50 flex-shrink-0">
                <i class="fas fa-tools"></i> <!-- Icon for property management -->
              </div>
            </div>
          </div>
        </div>

        <!-- Service Block 3: Real Estate Research & Consultancy -->
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 last:mb-0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div class="image-or-icon-side flex justify-center md:justify-start">
              <div class="text-brand-primary text-6xl md:text-7xl p-4 rounded-full bg-blue-50/50 flex-shrink-0">
                <i class="fas fa-chart-line"></i> <!-- Icon for research -->
              </div>
            </div>
            <div class="text-content-side">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Real Estate Research and Consultancy</h3>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                We help you discover property trends in your market. We are a team of professionals with a deep understanding of the real estate world. We go into work based on our educational qualifications, market experience and personal motivation to keep getting better.
              </p>
              <ul class="list-none space-y-3 text-gray-700 text-lg mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Urban market studies and feasibility analysis</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Market research and economic viability studies</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Land development consultancy services and project advisory</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Feasibility and valuation of land development projects</li>
              </ul>
              <BaseButton to="/contact" text="Request Consultancy Service" variant="primary" />
            </div>
          </div>
        </div>

        <!-- Service Block 4: Estate Agency Services -->
        <div class="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 last:mb-0">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div class="text-content-side md:order-2">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Estate Agency Services</h3>
              <p class="text-lg text-gray-700 leading-relaxed mb-6">
                With a network of real estate agents, we have managed to pull together great talent in real estate agency. We provide thorough agency services for commercial, residential, industrial and agricultural property that include:
              </p>
              <ul class="list-none space-y-3 text-gray-700 text-lg mb-8">
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Property sale and acquisition services</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Tenant selection, vetting of property buyers</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Letting and retail leasing, drawing up leases and sale agreements</li>
                <li class="flex items-start"><i class="fas fa-check-circle text-brand-primary mr-3 mt-1"></i> Registration of property documents and land sale agreements</li>
              </ul>
              <BaseButton to="/contact" text="Request Agency Service" variant="primary" />
            </div>
            <div class="image-or-icon-side flex justify-center md:justify-start md:order-1">
              <div class="text-brand-primary text-6xl md:text-7xl p-4 rounded-full bg-blue-50/50 flex-shrink-0">
                <i class="fas fa-handshake"></i> <!-- Icon for agency services -->
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Final Call to Action Section (reused for consistency) -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready to Explore Your Options?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact us today to discuss your property valuation and consultancy needs.
        </p>
        <BaseButton to="/contact" text="Request a Consultation" variant="primary" />
        <BaseButton to="/contact" text="Book a Call" variant="secondary-outline" class="ml-4 mt-4 md:mt-0" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';

// Page specific meta for SEO
// useHead is auto-imported by Nuxt; no explicit import required
useHead({
  title: 'Our Services - Benchmark Valuers',
  meta: [
    { name: 'description', content: 'Explore the comprehensive real estate valuation, property management, research, and agency services offered by Benchmark Valuers Ltd in Kenya.' }
  ]
});
</script>