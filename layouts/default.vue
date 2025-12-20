<template>
  <div class="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
</script>