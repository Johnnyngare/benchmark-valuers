// plugins/toast.client.ts
import { defineNuxtPlugin } from '#app';
import VueToastification, { useToast as createToastComposable } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Ensure this plugin only runs on the client-side for Vue-Toastification
  // (though it's a .client.ts file, good to be explicit for the plugin)
  if (process.server) return; 

  // Register the Vue-Toastification plugin with the Vue app
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
  // We name the imported useToast specifically to avoid conflicts.
  return {
    provide: {
      toast: createToastComposable() // Provide the function from the client-side plugin instance
    }
  }
});