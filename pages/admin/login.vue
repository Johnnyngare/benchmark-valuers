<!-- pages/admin/login.vue -->
<template>
  <section class="flex justify-center items-center py-16 md:py-24 bg-brand-light-bg min-h-[calc(100vh-160px)]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Staff Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
            required
            autocomplete="username"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200"
            required
            autocomplete="current-password"
          />
        </div>
        <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
        <div class="flex items-center justify-between">
          <BaseButton
            type="submit"
            text="Log In"
            variant="primary"
            class="w-full"
            :disabled="loading"
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// --- CRITICAL: Ensure useRouter and definePageMeta are imported from #imports ---
import { useRouter, definePageMeta } from '#imports';
import { useAuth } from '~/composables/useAuth';

// Define page meta (no explicit import for definePageMeta, it's auto-imported from #imports at runtime)
definePageMeta({
  layout: 'default',
  auth: false, // This page is intentionally public for unauthenticated access
});

const credentials = ref({
  username: '',
  password: '',
});
const error = ref<string | null>(null);
const loading = ref(false); // Used to disable button during API call
const router = useRouter(); // Nuxt's router instance
const { login, loggedIn } = useAuth(); // Your custom auth composable

// Redirect if already logged in (client-side check for active session)
// This helps prevent showing the login page if the user is already authenticated.
if (process.client && loggedIn.value) {
  router.push('/admin/dashboard');
}

async function handleLogin() {
  // --- Console logs for debugging execution flow ---
  console.log('Login button clicked!'); // Log 1: Check if this appears
  error.value = null; // Clear previous errors
  loading.value = true; // Disable button
  console.log('Attempting login with:', credentials.value.username); // Log 2: Check credentials

  try {
    await login(credentials.value.username, credentials.value.password);
    console.log('Login successful in handleLogin!'); // Log 3: Check if login composable finished
    // The useAuth composable already pushes to /admin/dashboard on success,
    // but this line ensures explicit navigation if the composable's push fails or is delayed.
    router.push('/admin/dashboard');
  } catch (e: any) {
    console.error('Login process caught an error in handleLogin:', e); // Log 4: Check error details
    error.value = e.data?.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false; // Re-enable button
    console.log('Login attempt finished. Loading state:', loading.value); // Log 5: Final state
  }
}
</script>