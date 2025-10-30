// plugins/auth.client.ts
import { defineNuxtPlugin } from '#imports';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtPlugin((nuxtApp) => {
  // This plugin only needs to run on the client side
  if (process.server) return;

  // --- THE FIX IS HERE ---
  // We now use the new, safer sync function that we created
  const { syncCookieWithState } = useAuth();

  // When the Nuxt app is mounted and ready on the client...
  nuxtApp.hook('app:mounted', () => {
    console.log('>>> PLUGIN: App is mounted, running initial state sync.');
    // ...sync the auth state with the cookie. This ensures that if a user
    // refreshes the page or opens the app, their login state is loaded correctly.
    syncCookieWithState();
  });
});