<!-- layouts/default.vue -->
<template>
  <div class="font-sans antialiased text-gray-800 bg-gray-50 min-h-screen flex flex-col">
    <AppHeader /> <!-- Our new header component -->

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter /> <!-- Our new footer component -->
  </div>
</template>

<script setup lang="ts">
// No script needed here directly, as components handle their own logic.
// If you need global layout logic, it would go here.
</script>