<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar (desktop) -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="flex-1 lg:ml-64 transition-all duration-300">
      <!-- Navbar -->
      <Navbar />

      <!-- Página principal -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'
import Sidebar from '~/components/layout/Sidebar.vue'
</script>