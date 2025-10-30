<template>
  <div class="blog-post-page">
    <section class="bg-brand-light-bg py-12 md:py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center text-brand-primary hover:underline mb-8"
        >
          <i class="fas fa-arrow-left mr-2"></i> Back to Blog
        </NuxtLink>

        <!-- Show a loading message while fetching -->
        <div v-if="pending" class="text-center py-20">Loading post...</div>
        
        <!-- Show an error message if the fetch fails -->
        <div v-else-if="error || !post" class="text-center text-gray-600 text-xl py-20">
          <p>Blog post not found. It might have been moved or deleted.</p>
          <NuxtLink
            to="/blog"
            class="inline-flex items-center text-brand-primary hover:underline mt-4"
          >
            Go back to all posts
          </NuxtLink>
        </div>

        <!-- Render the article only when the post has been successfully fetched -->
        <article v-else>
          <NuxtImg
            v-if="post.imageUrl"
            :src="post.imageUrl"
            :alt="post.title"
            class="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-8"
          />
          <div
            class="text-sm text-gray-500 mb-4 flex flex-wrap items-center justify-between gap-4"
          >
            <div class="flex items-center space-x-4">
              <span class="flex items-center"
                ><i class="fas fa-user-circle mr-2"></i> {{ post.author }}</span
              >
              <span class="flex items-center"
                ><i class="fas fa-calendar-alt mr-2"></i>
                {{ formattedDate }}</span
              >
              <!-- --- LIKE BUTTON --- -->
              <button 
                @click="handleLike" 
                :disabled="hasLiked || isLoadingLike"
                :class="[
                  'flex items-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
                  hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                ]"
              >
                <i class="fas fa-heart mr-2"></i>
                <span>{{ likeCount }}</span>
              </button>
            </div>
            <span
              v-if="post.category"
              class="bg-brand-primary text-white text-xs px-3 py-1 rounded-full uppercase font-semibold"
            >
              {{ post.category }}
            </span>
          </div>
          <h1
            class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight"
          >
            {{ post.title }}
          </h1>
          <p class="text-xl text-gray-700 mb-8">{{ post.description }}</p>
          
          <div 
            class="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            v-html="renderedContent"
          ></div>

          <div class="mt-16 pt-8 border-t border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              Related Insights
            </h2>
            <p class="text-gray-600">
              Related posts would go here.
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Final Call to Action Section -->
    <section
      class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-5xl font-extrabold mb-4">
          Want More Expert Insights?
        </h2>
        <p class="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          Contact our consultants for personalized real estate advice.
        </p>
        <BaseButton
          to="/contact"
          text="Request a Consultation"
          variant="primary"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useHead, useSeoMeta, useRuntimeConfig } from '#imports';
import { computed, ref, onMounted } from 'vue';
import { marked } from 'marked';

const route = useRoute();
// --- CRITICAL FIX: Remove .join('/') as slug is now directly a string ---
const slug = route.params.slug as string; 
// -----------------------------------------------------------------------
const config = useRuntimeConfig();

// Fetch the single blog post. The backend now returns a 'post' object directly
const { data: post, pending, error } = await useAsyncData(
  `blog-post-${slug}`,
  () => $fetch(`/api/posts/${slug}`)
);

// --- LIKE FUNCTIONALITY SCRIPT ---
// Initialize with likes count from fetched post data
const likeCount = ref(post.value?.likes?.[0]?.count || 0); // Correctly access nested likes count
const hasLiked = ref(false);
const isLoadingLike = ref(false);

onMounted(() => {
  if (window.localStorage.getItem(`liked-${slug}`)) {
    hasLiked.value = true;
  }
});

async function handleLike() {
  if (hasLiked.value || isLoadingLike.value) return;

  isLoadingLike.value = true;
  try {
    const response = await $fetch<{ likes: number }>(`/api/posts/${slug}/like`, { method: 'POST' });
    likeCount.value = response.likes;
    hasLiked.value = true;
    window.localStorage.setItem(`liked-${slug}`, 'true');
  } catch (e) {
    console.error("Failed to like post:", e);
  } finally {
    isLoadingLike.value = false;
  }
}
// --- END LIKE FUNCTIONALITY SCRIPT ---

const renderedContent = computed(() => {
  if (post.value && post.value.content) {
    return marked(post.value.content);
  }
  return '';
});

const formattedDate = computed(() => {
  if (!post.value || !post.value.createdAt) return "N/A";
  return new Date(post.value.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// --- ADVANCED SEO TAGS ---
useHead({
  title: computed(() => 
    post.value ? `${post.value.title} | Benchmark Valuers Blog` : 'Blog Post - Benchmark Valuers'
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => 
        post.value?.description || 'Read expert insights on real estate from Benchmark Valuers.'
      ),
    },
  ],
  link: computed(() => [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}/blog/${slug}`,
    },
  ]),
});

useSeoMeta({
  ogTitle: computed(() => post.value?.title ? `${post.value.title} | Benchmark Valuers Blog` : 'Benchmark Valuers Blog'),
  ogDescription: computed(() => post.value?.description || 'Stay informed with the latest real estate market trends, news, and expert insights from Benchmark Valuers.'),
  ogImage: computed(() => post.value?.imageUrl ? `${config.public.baseUrl}${post.value.imageUrl}` : `${config.public.baseUrl}/images/default-blog-social.jpg`),
  ogUrl: computed(() => `${config.public.baseUrl}/blog/${slug}`),
  ogType: 'article',
  ogArticlePublishedTime: computed(() => post.value?.createdAt ? new Date(post.value.createdAt).toISOString() : undefined),
  ogArticleAuthor: computed(() => post.value?.author || 'Benchmark Valuers'),

  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => post.value?.title ? `${post.value.title} | Benchmark Valuers Blog` : 'Benchmark Valuers Blog'),
  twitterDescription: computed(() => post.value?.description || 'Stay informed with the latest real estate market trends, news, and expert insights from Benchmark Valuers.'),
  twitterImage: computed(() => post.value?.imageUrl ? `${config.public.baseUrl}${post.value.imageUrl}` : `${config.public.baseUrl}/images/default-blog-social.jpg`),
  twitterCreator: '@BenchmarkValuers',
});
// --- END ADVANCED SEO TAGS ---
</script>

<style>
/* Tailwind Typography (prose) will style the v-html content */
</style>