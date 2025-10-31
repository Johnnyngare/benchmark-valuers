<template>
  <section class="container mx-auto px-4 py-16 md:py-24 bg-gray-50 min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
      <h1 class="text-3xl font-bold text-gray-800 text-center mb-2">Complete Your Registration</h1>
      <p class="text-center text-gray-600 mb-8">Create a password to activate your admin account.</p>

      <div v-if="!isValidInvite" class="text-center text-red-500 bg-red-50 p-4 rounded-lg">
        <p>This invitation link is invalid or has expired. Please request a new one.</p>
        <NuxtLink to="/" class="text-brand-primary hover:underline mt-2 inline-block">Go to Homepage</NuxtLink>
      </div>

      <form v-else @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            readonly 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
            placeholder="Enter a strong password"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required 
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" 
            placeholder="Re-enter your password"
          />
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isLoading" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-dark-blue disabled:bg-gray-400"
          >
            {{ isLoading ? 'Registering...' : 'Create Account' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, navigateTo, useNuxtApp } from '#imports'; // ADDED useNuxtApp
// import { useToast } from 'vue-toastification'; // <-- REMOVED THIS LINE

definePageMeta({
  layout: 'default',
});

useHead({
  title: 'Complete Registration | Benchmark Valuers',
});

const route = useRoute();
const nuxtApp = useNuxtApp(); // INITIALIZE nuxtApp
const toast = nuxtApp.$toast; // <--- GET TOAST INSTANCE FROM NUXT APP CONTEXT

const token = ref<string | null>(null);
const email = ref<string | null>(null);
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const isValidInvite = ref(false);

onMounted(() => {
  const routeToken = route.params.token as string;
  const queryEmail = route.query.email as string;

  if (routeToken === 'PRERENDER_PLACEHOLDER_TOKEN') { // Handle prerendered page
    isValidInvite.value = false;
    // Don't show toast on server, only on client after mount
    if (!process.server) {
      toast.error('This is a generic registration page. Please use a valid invite link.');
    }
  } else if (routeToken && queryEmail) {
    token.value = routeToken;
    email.value = queryEmail;
    isValidInvite.value = true;
  } else {
    isValidInvite.value = false;
    if (!process.server) {
      toast.error('Invalid or incomplete invitation link.');
    }
  }
});

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    toast.error('Passwords do not match.');
    return;
  }
  if (password.value.length < 8) {
    toast.error('Password must be at least 8 characters long.');
    return;
  }

  if (!token.value || !email.value) {
    toast.error('Registration details are missing. Please check your invitation link.');
    return;
  }

  isLoading.value = true;
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        token: token.value,
        email: email.value,
        password: password.value,
      },
    });

    toast.success('Registration successful! You can now log in.');
    await navigateTo('/admin/login');

  } catch (err: any) {
    console.error('Registration failed:', err);
    toast.error(err.data?.message || 'An unknown error occurred during registration. Please try again.');
  } finally {
    isLoading.value = false;
  }
}
</script>