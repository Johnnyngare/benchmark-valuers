<template>
  <section class="container mx-auto px-4 py-16 md:py-24 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Edit Blog Post</h1>
        <NuxtLink to="/admin/dashboard" class="text-brand-primary hover:underline">
          &larr; Back to Dashboard
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-center py-12">Loading post data...</div>
      <div v-else-if="fetchError" class="text-center py-12 text-red-500">
        Error loading post: {{ fetchError.data?.message || 'Could not fetch data.' }}
      </div>
      <div v-else-if="postData" class="bg-white rounded-lg shadow-xl p-8">
        <form @submit.prevent="updatePost">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <!-- Left Column: Form Fields -->
            <div>
              <div class="space-y-6">
                <!-- Title -->
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" id="title" v-model="postData.title" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                </div>

                <!-- Slug (Read-only as it's the identifier) -->
                <div>
                  <label for="slug" class="block text-sm font-medium text-gray-700">Slug (URL)</label>
                  <input type="text" id="slug" v-model="postData.slug" readonly class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" />
                </div>
            
                <!-- Author & Category -->
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" id="author" v-model="postData.author" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" id="category" v-model="postData.category" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                </div>

                <!-- Image Upload -->
                <div>
                  <label for="image" class="block text-sm font-medium text-gray-700">Change Featured Image</label>
                  <input type="file" id="image" @change="handleFileUpload" accept="image/jpeg, image/png, image/webp" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"/>
                  <div v-if="postData.imageUrl" class="mt-4">
                    <p class="text-sm text-gray-600 mb-2">Current image:</p>
                    <img :src="postData.imageUrl" :alt="postData.title" class="w-full h-auto max-h-48 object-cover rounded-md border" />
                  </div>
                </div>

                <!-- Description -->
                <div>
                  <label for="description" class="block text-sm font-medium text-gray-700">Description (for SEO)</label>
                  <textarea id="description" v-model="postData.description" rows="3" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
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
              <textarea id="content" v-model="postData.content" rows="15" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm font-mono"></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="mt-8 flex justify-end">
            <button type="submit" :disabled="isLoading" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark-blue disabled:bg-gray-400">
              {{ isLoading ? 'Saving...' : 'Update Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue';
import { useRoute, navigateTo } from '#imports';
import { marked } from 'marked';
import { useToast } from 'vue-toastification';

definePageMeta({ middleware: 'auth' });
const route = useRoute();
const slug = route.params.slug as string;
const toast = useToast();

useHead({ title: `Edit Post: ${slug} | Benchmark Valuers` });

// Fetch the existing post data using the new admin endpoint
const { data: initialPostData, pending, error: fetchError } = await useAsyncData(
  `post-edit-${slug}`,
  () => $fetch(`/api/admin/posts/${slug}`)
);

// Use reactive for the form data to ensure deep reactivity
const postData = reactive({
  title: '',
  slug: '',
  author: '',
  category: '',
  description: '',
  content: '',
  imageUrl: null as string | null,
});

// To track the original image URL for deletion
const oldImageUrl = ref<string | null>(null);

onMounted(() => {
  if (initialPostData.value) {
    // Populate the reactive object with fetched data
    Object.assign(postData, initialPostData.value);
    oldImageUrl.value = initialPostData.value.imageUrl; // Store the original image URL
  } else if (fetchError.value) {
    toast.error("Could not load post data. Redirecting to dashboard.");
    navigateTo('/admin/dashboard');
  }
});

const markdownPreview = computed(() => {
  return postData.content ? marked(postData.content) : '';
});

const isLoading = ref(false);
const selectedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

async function updatePost() {
  if (!postData) return;

  isLoading.value = true;
  try {
    // If a new file is selected, upload it first
    if (selectedFile.value) {
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const response = await $fetch<{ url: string }>('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      // Update the imageUrl for the current post data
      postData.imageUrl = response.url;
    }

    // Prepare the payload for the update API
    const updatePayload = {
      ...postData,
      oldImageUrl: oldImageUrl.value, // Send the original image URL
    };

    await $fetch(`/api/admin/posts/${slug}`, { // Use the correct RESTful endpoint
      method: 'POST', // Or PUT, depending on your preference (POST works fine)
      body: updatePayload
    });

    toast.success("Post updated successfully!");
    await navigateTo('/admin/dashboard');

  } catch (err: any) {
    console.error("Error updating post:", err);
    toast.error(err.data?.message || 'An unexpected error occurred.');
  } finally {
    isLoading.value = false;
  }
}
</script>