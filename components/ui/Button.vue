<template>
  <button
    class="px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    :class="{
      'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
      'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
      'border border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'outline',
    }"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'danger' | 'outline'
}>()
</script>