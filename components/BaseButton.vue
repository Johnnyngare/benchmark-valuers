<template>
  <NuxtLink
    v-if="to"  
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transition duration-300',
      {
        'bg-brand-primary hover:bg-brand-primary-darker text-white py-3 px-6 text-lg shadow-md': variant === 'primary',
        'bg-brand-primary hover:bg-brand-primary-darker text-white py-2 px-4 text-base shadow-sm': variant === 'primary-mobile',
        'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-3 px-6 text-lg': variant === 'secondary-outline',
        'bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 text-lg': variant === 'light',
        'opacity-70 cursor-not-allowed': disabled
      }
    ]"
    :disabled="disabled"
  >
    <slot>{{ text }}</slot>
  </NuxtLink>
  <button
    v-else 
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transition duration-300',
      {
        'bg-brand-primary hover:bg-brand-primary-darker text-white py-3 px-6 text-lg shadow-md': variant === 'primary',
        'bg-brand-primary hover:bg-brand-primary-darker text-white py-2 px-4 text-base shadow-sm': variant === 'primary-mobile',
        'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white py-3 px-6 text-lg': variant === 'secondary-outline',
        'bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 text-lg': variant === 'light',
        'opacity-70 cursor-not-allowed': disabled
      }
    ]"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'; 

type ButtonVariant = 'primary' | 'primary-mobile' | 'secondary-outline' | 'light';

const props = defineProps({
  to: {
    type: String,
  },
  text: {
    type: String,
    default: 'Button',
  },
  variant: {
    type: String as PropType<ButtonVariant>,
    default: 'primary',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
});
</script>