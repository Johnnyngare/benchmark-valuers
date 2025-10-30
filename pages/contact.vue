<!-- pages/contact.vue -->
<template>
  <div class="contact-page">
    <!-- Page Hero Section -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Get in touch with our team for professional real estate valuation and consultancy services.
        </p>
      </div>
    </section>

    <!-- Main Contact Content Section -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">

        <!-- Contact Form Section -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
          <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-lg">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- First Name -->
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
              <!-- Last Name -->
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

            <!-- Email Address -->
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

            <!-- Phone Number -->
            <div class="mb-6">
              <label for="phone" class="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                v-model="formData.phone"
                class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
                placeholder="+254 7XX XXX XXX"
              />
            </div>

            <!-- Service Required (Dropdown) -->
            <div class="mb-6">
              <label for="service" class="block text-gray-700 text-sm font-semibold mb-2">Service Required *</label>
              <select
                id="service"
                v-model="formData.service"
                class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 custom-select"
                required
              >
                <option value="" disabled selected>Select a service</option>
                <option value="property_valuation">Property Valuation</option>
                <option value="investment_advisory">Investment Advisory</option>
                <option value="property_management">Property Management</option>
                <option value="real_estate_research">Real Estate Research & Consultancy</option>
                <option value="estate_agency">Estate Agency Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Message -->
            <div class="mb-8">
              <label for="message" class="block text-gray-700 text-sm font-semibold mb-2">Message *</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="6"
                class="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 resize-y"
                required
                placeholder="Tell us about your requirements..."
              ></textarea>
            </div>

            <div class="flex items-center justify-between">
              <BaseButton
                type="submit"
                text="Send Message"
                variant="primary"
                class="w-full"
                :disabled="loading"
              />
            </div>

            <!-- Submission Status Messages -->
            <p v-if="successMessage" class="mt-6 text-green-600 text-center font-medium">{{ successMessage }}</p>
            <p v-if="errorMessage" class="mt-6 text-red-600 text-center font-medium">{{ errorMessage }}</p>
          </form>
        </div>

        <!-- Contact Information & Map/Hours Section -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Get in Touch</h2>

          <div class="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <ul class="space-y-4 text-lg text-gray-700">
              <li class="flex items-center">
                <i class="fas fa-map-marker-alt text-brand-primary mr-3 text-xl"></i>
                <div>
                  <p class="font-semibold">Head Office</p>
                  <p>Madonna House Annex, Suite A409, 4th Floor,</p>
                  <p>Westlands Road, Westlands, Nairobi, Kenya</p>
                  <p class="mt-2 font-semibold">Nakuru Office</p>
                  <p>Trade World Building, 1st Floor,</p>
                  <p>Kijabe Row Opposite Mache Plaza, Nakuru</p>
                  <p class="mt-2 font-semibold">P.O Box</p>
                  <p>P.O Box 66499 – 00800, Westlands</p>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-phone-alt text-brand-primary mr-3 text-xl"></i>
                <div>
                  <p class="font-semibold">Phone</p>
                  <p>+254 794 318 971</p>
                  <p>+254 700 000 000</p>
                </div>
              </li>
              <li class="flex items-center">
                <i class="fas fa-envelope text-brand-primary mr-3 text-xl"></i>
                <div>
                  <p class="font-semibold">Email</p>
                  <p>info@benchmarkvaluers.co.ke</p>
                  <p>valuations@benchmarkvaluers.co.ke</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="bg-white p-8 rounded-lg shadow-lg">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">Business Hours</h3>
            <ul class="space-y-2 text-lg text-gray-700">
              <li class="flex justify-between"><span>Monday - Friday:</span> <span>8:00 AM - 6:00 PM</span></li>
              <li class="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 1:00 PM</span></li>
              <li class="flex justify-between"><span>Sunday:</span> <span>Closed</span></li>
            </ul>
            <!-- Google Map Embed Placeholder -->
            <div class="mt-8 bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-600 text-sm overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8105051917757!2d36.78280621475485!3d-1.2882583990666904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10b74108848d%3A0xc32561937f26d36e!2sABC%20Place!5e0!3m2!1sen!2ske!4v1678900000000!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Call to Action Section (reused for consistency) -->
    <section class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">Ready to Discuss Your Needs?</h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Reach out today for expert advice and personalized solutions.
        </p>
        <BaseButton to="/contact" text="Book a Free Consultation" variant="primary" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHead } from 'nuxt/app';
import { ref } from 'vue';

// Page specific meta for SEO
useHead({
  title: 'Contact Us - Benchmark Valuers',
  meta: [
    { name: 'description', content: 'Get in touch with Benchmark Valuers Ltd for professional real estate valuation and consultancy services in Nairobi, Kenya. Send us a message or find our contact details and business hours.' }
  ]
});

// Form data reactive state
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '', // From the dropdown
  message: '',
});

const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

async function submitForm() {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const response = await $fetch<Record<string, any>>('/api/contact', {
      method: 'POST',
      body: formData.value,
    });

    if (response.status === 'success') {
      successMessage.value = 'Your message has been sent successfully! We will get back to you shortly.';
      // Clear the form
      formData.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      };
    } else {
      errorMessage.value = response?.message || 'Failed to send your message. Please try again.';
    }

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    errorMessage.value = error.data?.message || 'An unexpected error occurred. Please try again later.';
  } finally {
    loading.value = false;
  }
}
</script>

<style>
/* Custom style for the select arrow to override default Tailwind appearance */
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