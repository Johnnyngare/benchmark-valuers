<!-- components/TeamMemberCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow duration-300">
    <NuxtImg
      :src="image"
      :alt="name"
      class="w-full h-64 object-cover object-center grayscale hover:grayscale-0 transition-all duration-300"
      loading="lazy"
      placeholder
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ name }}</h3>
      <p class="text-blue-600 font-medium text-sm">{{ role }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '/images/default-team-member.jpg', // Placeholder image
  },
});
</script>