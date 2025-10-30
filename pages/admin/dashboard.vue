<template>
  <section
    class="container mx-auto px-4 py-16 md:py-24 bg-gray-50 min-h-screen"
  >
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
    >
      <h1
        class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 md:mb-0"
      >
        Admin Dashboard
      </h1>
      <NuxtLink to="/admin/create" class="inline-block bg-brand-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-dark-blue transition-colors duration-300">
        Create New Post
      </NuxtLink>
    </div>

    <!-- Manage Blog Posts Section -->
    <div class="bg-white rounded-lg shadow-xl p-6 sm:p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Manage Blog Posts</h2>

      <div v-if="pending" class="text-center py-12 text-gray-500">
        Loading posts...
      </div>
      <div v-else-if="error" class="text-center py-12 text-red-500 bg-red-50 p-4 rounded-lg">
        <strong>Error loading posts:</strong> {{ error.data?.message || 'Could not fetch blog posts.' }}
      </div>
      <div v-else-if="!posts || posts.length === 0" class="text-center py-12 text-gray-500">
        No blog posts found. Let's create one!
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm">
            <tr v-for="post in posts" :key="post.slug" class="border-b border-gray-200 hover:bg-gray-50"> <!-- CHANGED: use post.slug as key -->
              <td class="py-4 px-6 text-left whitespace-nowrap">
                <NuxtLink :to="`/blog/${post.slug}`" target="_blank" class="font-medium text-brand-primary hover:underline" :title="`View live post: ${post.title}`"> <!-- CHANGED: use post.slug -->
                  {{ post.title || 'Untitled Post' }}
                </NuxtLink>
              </td>
              <td class="py-4 px-6 text-left">{{ post.author || 'N/A' }}</td>
              <td class="py-4 px-6 text-left">{{ new Date(post.createdAt).toLocaleDateString() }}</td> <!-- CHANGED: use post.createdAt and format -->
              <td class="py-4 px-6 text-left">
                <span :class="['px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', post.isDraft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']"> <!-- Assuming 'isDraft' from schema, or adjust if you still use '_draft' -->
                  {{ post.isDraft ? "Draft" : "Published" }}
                </span>
              </td>
              <td class="py-4 px-6 text-center">
                <div v-if="post.slug" class="flex item-center justify-center space-x-4"> <!-- CHANGED: use post.slug -->
                  <NuxtLink :to="`/admin/edit/${post.slug}`" class="text-gray-500 hover:text-brand-primary" title="Edit Post"> <!-- CHANGED: use post.slug -->
                    Edit
                  </NuxtLink>
                  <button @click="handleDelete(post.slug)" class="text-gray-500 hover:text-red-600" title="Delete Post"> <!-- CHANGED: use post.slug -->
                    Delete
                  </button>
                </div>
                <div v-else class="text-red-500 text-xs">
                  No Slug
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Admin Invite System Section -->
    <div class="bg-white rounded-lg shadow-xl p-6 sm:p-8 mt-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Invite New User</h2>
      <form @submit.prevent="sendInvite" class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div class="flex-grow w-full">
          <label for="inviteEmail" class="sr-only">Email</label>
          <input
            type="email"
            id="inviteEmail"
            v-model="inviteEmail"
            placeholder="Enter new user's email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
        <button type="submit" :disabled="isInviting" class="w-full sm:w-auto bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-dark-blue disabled:opacity-50">
          {{ isInviting ? 'Sending...' : 'Send Invite' }}
        </button>
      </form>
      <div v-if="generatedUrl" class="mt-4 p-4 bg-gray-100 rounded-md">
        <p class="text-sm text-gray-600 mb-2">Share this registration link with the user:</p>
        <input :value="generatedUrl" readonly class="w-full bg-white border border-gray-300 rounded-md p-2 text-sm" />
        <button @click="copyToClipboard" class="mt-2 text-sm text-brand-primary hover:underline">
          <i class="fas fa-copy mr-1"></i> Copy Link
        </button>
      </div>
    </div>

    <div class="mt-12 text-center">
      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-200">
        Logout
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useToast } from 'vue-toastification';
import { useRuntimeConfig } from 'nuxt/app'; // Import useRuntimeConfig

definePageMeta({
  layout: "default",
  middleware: ["auth"],
});

useHead({
  title: "Admin Dashboard | Benchmark Valuers",
  meta: [{ name: "description", content: "Manage website blog content." }],
});

const { logout } = useAuth();
const toast = useToast();
const config = useRuntimeConfig(); // Initialize runtime config

// Interface for blog posts fetched from the API
interface AdminBlogPost {
  id: number;
  slug: string;
  title: string;
  author: string | null;
  createdAt: string; // ISO string from database
  updatedAt: string;
  isDraft?: boolean; // If you add a draft status to your schema
  // imageUrl: string | null; // Other properties you might display
}


const { data: posts, pending, error, refresh } = await useAsyncData<AdminBlogPost[]>( // Use the new interface
  'admin-posts',
  () => $fetch('/api/admin/posts'),
  { lazy: false }
);

// --- Post Deletion Logic ---
function handleDelete(slug: string) { // Changed type to string
  if (!slug) {
    toast.error('Cannot delete post without a slug.');
    return;
  }

  if (confirm(`Are you sure you want to permanently delete '${slug}'?`)) {
    confirmDelete(slug);
  }
}

async function confirmDelete(slug: string) {
  try {
    await $fetch(`/api/admin/posts/${slug}`, { method: 'DELETE' });
    toast.success(`Post '${slug}' deleted successfully!`);
    await refresh();
  } catch (err: any) {
    console.error('Failed to delete post:', err);
    toast.error(err.data?.message || 'Could not delete the post.');
  }
}

// --- Admin Invite System Logic ---
const inviteEmail = ref('');
const isInviting = ref(false);
const generatedUrl = ref<string | null>(null);

async function sendInvite() {
  if (!inviteEmail.value) {
    toast.error('Please enter an email address to send an invite.');
    return;
  }
  isInviting.value = true;
  generatedUrl.value = null; // Clear previous URL

  try {
    const response = await $fetch<{ registrationUrl: string }>('/api/admin/invite', {
      method: 'POST',
      body: { email: inviteEmail.value }
    });
    // The registrationUrl now includes `config.public.baseUrl` from the server
    generatedUrl.value = response.registrationUrl;
    toast.success("Invite link generated successfully! Share it with the user.");
    inviteEmail.value = ''; // Clear the input field
  } catch (e: any) {
    console.error("Error generating invite:", e);
    toast.error(e.data?.message || "Failed to generate invite.");
  } finally {
    isInviting.value = false;
  }
}

// Function to copy the generated URL to clipboard
async function copyToClipboard() {
  if (generatedUrl.value) {
    try {
      await navigator.clipboard.writeText(generatedUrl.value);
      toast.info('Registration link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
      toast.error('Failed to copy link.');
    }
  }
}
</script>