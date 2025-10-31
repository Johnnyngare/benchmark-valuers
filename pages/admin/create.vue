<template>
  <section class="container mx-auto px-4 py-16 md:py-24 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Create New Blog Post</h1>
        <NuxtLink to="/admin/dashboard" class="text-brand-primary hover:underline">
          &larr; Back to Dashboard
        </NuxtLink>
      </div>

      <div class="bg-white rounded-lg shadow-xl p-8">
        <form @submit.prevent="createPost">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <!-- Left Column: Form Fields -->
            <div>
              <div class="space-y-6">
                <!-- Title -->
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" id="title" v-model="post.title" @input="generateSlug" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>

                <!-- Slug -->
                <div>
                  <label for="slug" class="block text-sm font-medium text-gray-700">Slug (URL)</label>
                  <input type="text" id="slug" v-model="post.slug" readonly class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" />
                </div>
            
                <!-- Author & Category -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" id="author" v-model="post.author" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" id="category" v-model="post.category" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                </div>

                <!-- Image Upload -->
                <div>
                  <label for="image" class="block text-sm font-medium text-gray-700">Featured Image</label>
                  <input type="file" id="image" @change="handleFileUpload" accept="image/jpeg, image/png, image/webp" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"/>
                  <p v-if="post.imageUrl" class="mt-2 text-sm text-gray-600">Image uploaded: {{ post.imageUrl.substring(0, 50) }}...</p>
                </div>

                <!-- Description -->
                <div>
                  <label for="description" class="block text-sm font-medium text-gray-700">Description (for SEO)</label>
                  <textarea id="description" v-model="post.description" rows="3" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
              </div>
            </div>

            <!-- Right Column: Live Preview Area -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Live Preview</label>
              <div 
                class="mt-1 prose prose-sm max-w-none h-full border border-gray-300 rounded-md p-4 bg-gray-50 overflow-y-auto"
                v-html="markdownPreview"
              ></div>
            </div>

            <!-- Markdown Editor (Full Width) -->
            <div class="md:col-span-2">
              <label for="content" class="block text-sm font-medium text-gray-700">Content (Markdown)</label>
              <textarea id="content" v-model="post.content" rows="15" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-mono"></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-8 flex justify-end">
            <button type="submit" :disabled="isLoading" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark-blue disabled:bg-gray-400">
              {{ isLoading ? 'Creating...' : 'Create Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { navigateTo, useNuxtApp } from '#imports'; // ADDED useNuxtApp
import { marked } from 'marked';
// import { useToast } from 'vue-toastification'; // <-- REMOVED this line

definePageMeta({ middleware: 'auth' });
useHead({ title: 'Create New Post | Benchmark Valuers' });

const nuxtApp = useNuxtApp(); // INITIALIZE nuxtApp
const toast = nuxtApp.$toast; // <--- GET TOAST INSTANCE FROM NUXT APP CONTEXT
const isLoading = ref(false);
const selectedFile = ref<File | null>(null);

// Data model matches the database schema now
const post = ref({
  title: '',
  slug: '',
  author: 'Admin',
  category: '',
  description: '',
  content: '# Start writing your post here...\n\nUse **Markdown** to format your text.',
  imageUrl: ''
});

const markdownPreview = computed(() => {
  if (post.value.content) {
    return marked(post.value.content);
  }
  return '<p class="text-gray-500">Start typing to see a preview...</p>';
});

const generateSlug = () => {
  post.value.slug = post.value.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

async function createPost() {
  isLoading.value = true;
  try {
    if (selectedFile.value) {
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const response = await $fetch<{ url: string }>('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      post.value.imageUrl = response.url;
    }

    await $fetch('/api/admin/posts/create', {
      method: 'POST',
      body: post.value
    });
    
    toast.success("Post created successfully!");
    await navigateTo('/admin/dashboard');

  } catch (err: any) {
    console.error("Error creating post:", err);
    toast.error(err.data?.message || 'An unknown error occurred.');
  } finally {
    isLoading.value = false;
  }
}
</script>