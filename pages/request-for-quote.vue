<template>
  <div class="request-for-quote-page">
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Request for Quote</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Please fill out the form below to receive a customized quote for our services.
        </p>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Get Your Custom Quote</h2>
        <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label for="firstName" class="block text-gray-700 text-sm font-semibold mb-2">First Name *</label>
              <input
                type="text"
                id="firstName"
                v-model="formData.firstName"
                class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                required
                placeholder="John"
              />
            </div>
            <div>
              <label for="lastName" class="block text-gray-700 text-sm font-semibold mb-2">Last Name *</label>
              <input
                type="text"
                id="lastName"
                v-model="formData.lastName"
                class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                required
                placeholder="Doe"
              />
            </div>
          </div>

          <div class="mb-6">
            <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
              required
              placeholder="john.doe@example.com"
            />
          </div>

          <div class="mb-6">
            <label for="phone" class="block text-gray-700 text-sm font-semibold mb-2">Phone Number *</label> <!-- Made required for RFQ -->
            <input
              type="tel"
              id="phone"
              v-model="formData.phone"
              class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
              required
              placeholder="+254 7XX XXX XXX"
            />
          </div>

          <div class="mb-6">
            <label for="service" class="block text-gray-700 text-sm font-semibold mb-2">Service of Interest *</label>
            <select
              id="service"
              v-model="formData.service"
              class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 custom-select"
              required
            >
              <option value="" disabled selected>Select a service</option>
              <option value="property_valuation">Property Valuation</option>
              <option value="investment_advisory">Investment Advisory</option>
              <option value="asset_management">Asset Management</option>
              <option value="mortgage_valuation">Mortgage Valuation</option>
              <option value="other">Other specific request</option>
            </select>
          </div>

          <div class="mb-8">
            <label for="details" class="block text-gray-700 text-sm font-semibold mb-2">Details for Quote *</label>
            <textarea
              id="details"
              v-model="formData.details"
              rows="6"
              class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 resize-y"
              required
              placeholder="Please provide details about the property, scope of work, and any specific requirements..."
            ></textarea>
          </div>

          <div class="flex items-center justify-between">
            <BaseButton
              type="submit"
              text="Submit Request"
              variant="primary"
              class="w-full"
              :disabled="loading"
            />
          </div>

          <p v-if="successMessage" class="mt-6 text-green-600 text-center font-medium">{{ successMessage }}</p>
          <p v-if="errorMessage" class="mt-6 text-red-600 text-center font-medium">{{ errorMessage }}</p>
        </form>
      </div>
    </section>

    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready for a Customized Solution?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Submit your request today, and our experts will get back to you with a detailed quote.
        </p>
        <BaseButton to="/contact" text="Contact Us" variant="primary" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { ref } from 'vue';
import { useNuxtApp } from '#imports';

definePageMeta({
  ssr: false,
});

useHead({
  title: 'Request for Quote - Benchmark Valuers',
  meta: [
    { name: 'description', content: 'Request a customized quote for real estate valuation, investment advisory, and asset management services from Benchmark Valuers Ltd in Kenya.' }
  ]
});

const nuxtApp = useNuxtApp();
const toast = nuxtApp.$toast;

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  details: '',
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function submitForm() {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await $fetch<Record<string, any>>('/api/request-quote', {
      method: 'POST',
      body: formData.value,
    });

    if (response.status === 'success') {
      successMessage.value = 'Your quote request has been sent successfully! We will get back to you shortly.';
      toast.success('Quote request sent!');
      formData.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        details: '',
      };
    } else {
      errorMessage.value = response?.message || 'Failed to send your request. Please try again.';
      toast.error('Failed to send quote request.');
    }

  } catch (error: any) {
    console.error('RFQ submission error:', error);
    errorMessage.value = error.data?.message || 'An unexpected error occurred. Please try again later.';
    toast.error('Error submitting quote request.');
  } finally {
    loading.value = false;
  }
}
</script>

<style>
.custom-select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23374151' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>