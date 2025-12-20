<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 bg-brand-primary text-white p-3 rounded-full shadow-lg hover:bg-brand-dark-blue transition-colors duration-300 focus:outline-none"
    aria-label="Back to top"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const handleScroll = () => {
  showButton.value = window.scrollY > 300; 
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>