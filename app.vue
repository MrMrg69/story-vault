<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Força o uso do layout padrão para garantir consistência
// Isso evita que páginas sejam renderizadas sem layout em futuras atualizações
</script>