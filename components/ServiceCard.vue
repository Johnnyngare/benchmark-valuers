<!-- components/ServiceCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
    <div class="text-brand-primary text-5xl mb-4">
      <i :class="icon"></i>
    </div>
    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h3>
    <p class="text-gray-600 text-sm mb-4">{{ description }}</p>
    <NuxtLink :to="link" class="text-brand-primary hover:text-brand-primary-darker font-medium transition-colors duration-200">
      Learn More <span aria-hidden="true">&rarr;</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  icon: {
    type: String,
    required: true,
    // Example: 'fas fa-building', 'fas fa-chart-line', 'fas fa-briefcase'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    default: '#', // Provide a meaningful default or ensure it's always set
  },
});
</script>