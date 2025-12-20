import { defineNuxtPlugin } from '#imports';
import { useAuth } from '~/composables/useAuth';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const { syncCookieWithState } = useAuth();

  nuxtApp.hook('app:mounted', () => {
    console.log('>>> PLUGIN: App is mounted, running initial state sync.');
    syncCookieWithState();
  });
});