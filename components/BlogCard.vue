<!-- components/BlogCard.vue -->
<template>
  <NuxtLink
    :to="`/blog/${slug}`"
    class="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
  >
    <NuxtImg
      :src="image"
      :alt="title"
      class="w-full h-48 object-cover rounded-t-lg"
      loading="lazy"
      placeholder
    />
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2 truncate">
        {{ title }}
      </h3>
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <span class="mr-3"
          ><i class="fas fa-user-circle mr-1"></i> {{ author }}</span
        >
        <span><i class="fas fa-calendar-alt mr-1"></i> {{ formattedDate }}</span>
      </div>
      <p class="text-gray-700 text-base mb-4 line-clamp-3">{{ excerpt }}</p>
      <span
        class="text-brand-primary hover:text-brand-primary-darker font-medium text-sm"
      >
        Read Full Article <span aria-hidden="true">&rarr;</span>
      </span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

// defineProps is a compiler macro and does not need to be imported.
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "/images/default-blog-placeholder.jpg",
  },
  author: {
    type: String,
    default: "Benchmark Valuers",
  },
  date: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    default: "",
  },
});

// Computed property to format the date string for display
const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>