// plugins/toast.client.ts
import { defineNuxtPlugin } from '#app';
// We import the main plugin directly and alias useToast for internal use if needed
import VueToastification, { useToast as createToastComposable } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  // This plugin explicitly runs on the client-side only (due to .client.ts suffix)
  // But for the Vue plugin itself, ensuring it's not called on server is good defensive coding.
  if (process.server) {
    // If somehow this runs on server, provide a dummy to prevent crashes
    return {
      provide: {
        toast: (() => { console.warn('useToast is not available on server-side.'); return { success: () => {}, error: () => {}, info: () => {}, warning: () => {} }; })()
      }
    };
  }

  // Register the vue-toastification plugin with the Vue app
  nuxtApp.vueApp.use(VueToastification, {
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
  });

  // Provide the actual useToast composable through the Nuxt app context.
  // This makes `useNuxtApp().$toast` available in your components.
  // We call `createToastComposable()` here to get the actual instance provided by the plugin.
  return {
    provide: {
      toast: createToastComposable()
    }
  };
});