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
import { useRouter, definePageMeta } from '#imports';
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  layout: 'default',
  auth: false,
});

const credentials = ref({
  username: '',
  password: '',
});
const error = ref<string | null>(null);
const loading = ref(false);
const router = useRouter();
const { login, loggedIn } = useAuth();

if (process.client && loggedIn.value) {
  router.push('/admin/dashboard');
}

async function handleLogin() {
  console.log('Login button clicked!');
  error.value = null;
  loading.value = true;
  console.log('Attempting login with:', credentials.value.username);

  try {
    await login(credentials.value.username, credentials.value.password);
    console.log('Login successful in handleLogin!');
    router.push('/admin/dashboard');
  } catch (e: any) {
    console.error('Login process caught an error in handleLogin:', e);
    error.value = e.data?.message || 'Login failed. Please check your credentials.';
  } finally {
    loading.value = false;
    console.log('Login attempt finished. Loading state:', loading.value);
  }
}
</script>