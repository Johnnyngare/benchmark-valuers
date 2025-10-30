// plugins/toast.client.ts
import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Register the vue-toastification plugin with the Vue app
  nuxtApp.vueApp.use(Toast, {
    // You can set your default options here
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
});