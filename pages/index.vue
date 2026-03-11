<script setup lang="ts">
import { onMounted } from 'vue'
import { navigateTo } from '#app'

// 🔁 Redireciona para a biblioteca assim que o componente for montado
onMounted(() => {
  navigateTo('/library', { replace: true })
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-lg font-medium text-gray-700">
        Carregando Story Vault...
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Animação extra (opcional) */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>