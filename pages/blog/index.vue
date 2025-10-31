<template>
  <div class="blog-listing-page">
    <!-- Page Hero Section -->
    <section
      class="bg-brand-secondary-dark text-white py-16 md:py-24 text-center"
    >
      <div class="container mx-auto px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          Blog & Insights
        </h1>
        <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
          Stay informed with the latest real estate market trends, news, and
          expert insights.
        </p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16 md:py-24 bg-brand-light-bg">
      <div class="container mx-auto px-4">
        <h2 class="sr-only">Latest Articles</h2>
        <!-- Screen reader only title -->

        <!-- Search and Filter -->
        <div
          class="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0"
        >
          <div class="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search articles..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              v-model="searchQuery"
              @input="refreshPage" 
            />
            <i
              class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></i>
          </div>
          <div class="flex space-x-2 md:space-x-4">
            <button
              @click="setCategory('All Posts')"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition-colors duration-200',
                selectedCategory === 'All Posts'
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              All Posts
            </button>
            <button
              @click="setCategory('Market Trends')"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition-colors duration-200',
                selectedCategory === 'Market Trends'
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              Market Trends
            </button>
            <button
              @click="setCategory('Guides')"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition-colors duration-200',
                selectedCategory === 'Guides'
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              Guides
            </button>
            <button
              @click="setCategory('Investment')"
              :class="[
                'px-5 py-2 rounded-lg font-medium transition-colors duration-200',
                selectedCategory === 'Investment'
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              ]"
            >
              Investment
            </button>
          </div>
        </div>

        <div
          v-if="pending"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <!-- Placeholder skeletons for loading state -->
          <div v-for="n in postsPerPage" :key="n" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div class="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div
          v-else-if="filteredPosts.length"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <BlogCard
            v-for="post in filteredPosts"
            :key="post.slug"             
            :title="post.title"
            :slug="post.slug"             
            :image="post.imageUrl"        
            :author="post.author"
            :date="post.createdAt"
            :excerpt="post.description"
          />
        </div>
        <div v-else class="text-center text-gray-600 text-lg py-10">
          No blog posts found matching your criteria.
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center space-x-4">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || pending"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages || pending"
            class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
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
import { ref, computed, watch } from "vue";
import { useAsyncData, useHead, useRoute, useRouter, useSeoMeta, useRuntimeConfig } from "nuxt/app";

// --- ADDED: Disable SSR for this page ---
definePageMeta({
  ssr: false, 
});
// --- END ADDED ---

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  category: string | null;
  content: string;
}

interface PaginatedResponse {
  posts: BlogPost[];
  totalPosts: number;
  currentPage: number;
  postsPerPage: number;
  totalPages: number;
}

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

const searchQuery = ref<string>((route.query.search as string) || '');
const selectedCategory = ref<string>((route.query.category as string) || 'All Posts');
const currentPage = ref<number>(parseInt(route.query.page as string) || 1);
const postsPerPage = ref<number>(6);

const fetchPosts = async () => {
  const params: Record<string, string | number> = {
    page: currentPage.value,
    limit: postsPerPage.value,
  };
  if (searchQuery.value) {
    params.search = searchQuery.value;
  }
  if (selectedCategory.value !== 'All Posts') {
    params.category = selectedCategory.value;
  }

  await router.push({ query: params });
  
  return await $fetch<PaginatedResponse>('/api/posts', {
    params: params
  });
};

const { data: paginatedData, pending, error, refresh } = await useAsyncData(
  'paginatedBlogPosts',
  fetchPosts,
  {
    watch: [currentPage, searchQuery, selectedCategory],
    immediate: true,
  }
);

const posts = computed(() => paginatedData.value?.posts || []);
const totalPosts = computed(() => paginatedData.value?.totalPosts || 0);
const totalPages = computed(() => paginatedData.value?.totalPages || 0);

const filteredPosts = computed(() => posts.value);


const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const setCategory = (category: string) => {
  selectedCategory.value = category;
  currentPage.value = 1;
};

const refreshPage = () => {
  currentPage.value = 1;
  refresh();
}

useHead({
  title: 'Blog & Insights - Benchmark Valuers',
  link: [
    {
      rel: 'canonical',
      href: `${config.public.baseUrl}/blog`,
    },
  ],
});

useSeoMeta({
  title: 'Blog & Insights - Benchmark Valuers',
  ogTitle: 'Blog & Insights - Benchmark Valuers',
  description: 'Stay informed with the latest real estate market trends, news, and expert insights from Benchmark Valuers Ltd in Kenya.',
  ogDescription: 'Stay informed with the latest real estate market trends, news, and expert insights from Benchmark Valuers Ltd in Kenya.',
  ogImage: `${config.public.baseUrl}/images/blog-default-social.jpg`,
  ogUrl: `${config.public.baseUrl}/blog`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog & Insights - Benchmark Valuers',
  twitterDescription: 'Stay informed with the latest real estate market trends, news and expert insights from Benchmark Valuers Ltd in Kenya.',
  twitterImage: `${config.public.baseUrl}/images/blog-default-social.jpg`,
  twitterCreator: '@BenchmarkValuers',
});
</script>

<style>
/* Your existing styles are fine */
</style>