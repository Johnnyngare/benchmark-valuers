<!-- pages/auth/login.vue -->
<template>
  <section class="flex justify-center items-center py-16 md:py-24 bg-gray-100 min-h-[calc(100vh-160px)]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">Staff Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            v-model="credentials.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            v-model="credentials.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
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
          <!-- Optionally add a Forgot Password link -->
          <!-- <NuxtLink to="/auth/forgot-password" class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
            Forgot Password?
          </NuxtLink> -->
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth'; // Ensure this path is correct

// Define page meta to disable auth middleware for the login page itself
declare const definePageMeta: (meta: any) => void;
definePageMeta({
  layout: 'default', // Use your default layout
  auth: false, // Explicitly mark as non-protected for the auth middleware
});

const credentials = ref({
  username: '',
  password: '',
});
const error = ref<string | null>(null);
const loading = ref(false); // To prevent multiple submissions
const router = useRouter();
const { login, loggedIn } = useAuth(); // Import loggedIn to check if user is already logged in

// Redirect if already logged in
if (process.client && loggedIn.value) {
  router.push('/admin/dashboard'); // Redirect to dashboard if already authenticated
}

async function handleLogin() {
  console.log('Login button clicked!');
  error.value = null;
  loading.value = true;
  console.log('Attempting login with:', credentials.value.username);
  try {
    await login(credentials.value.username, credentials.value.password);
    console.log('Login successful!'); // Log 3
    router.push('/admin/dashboard'); // Redirect to dashboard after successful login
  } catch (e: any) {
    console.error('Login process caught an error:', e); // Log 4
    error.value = e.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
    console.log('Login attempt finished. Loading state:', loading.value); // Log 5
  }
}
</script>