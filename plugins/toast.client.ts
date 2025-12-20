import { defineNuxtPlugin } from '#app';
import VueToastification, { useToast as createToastComposable } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    return {
      provide: {
        toast: (() => { console.warn('useToast is not available on server-side.'); return { success: () => {}, error: () => {}, info: () => {}, warning: () => {} }; })()
      }
    };
  }

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

  return {
    provide: {
      toast: createToastComposable()
    }
  };
});