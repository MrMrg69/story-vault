<template>
  <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-30">
    <!-- Logo -->
    <div class="p-6 flex items-center gap-3 border-b border-gray-100">
      <div class="bg-blue-600 text-white p-2 rounded-lg">
        <BookOpenIcon class="w-6 h-6" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-gray-900">Story Vault</h1>
        <p class="text-xs text-gray-500">Seu hub de entretenimento</p>
      </div>
    </div>

    <!-- Navegação -->
    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
        :class="{
          'bg-blue-50 text-blue-700 font-medium': isActive(link.to),
          'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !isActive(link.to)
        }"
      >
        <component :is="link.icon" class="w-5 h-5" />
        {{ link.label }}
      </NuxtLink>

      <!-- Seção de Estatísticas -->
      <div class="mt-8 px-4">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Estatísticas</h3>
        <div class="space-y-2">
          <div v-if="stats.total > 0" class="flex justify-between items-center px-2 py-2 rounded-lg bg-gray-50">
            <span class="text-sm text-gray-600">Total</span>
            <span class="text-sm font-semibold text-gray-900">{{ stats.total }}</span>
          </div>
          <div v-if="stats.completed > 0" class="flex justify-between items-center px-2 py-2 rounded-lg bg-green-50">
            <span class="text-sm text-green-700">Concluídos</span>
            <span class="text-sm font-semibold text-green-900">{{ stats.completed }}</span>
          </div>
          <div v-if="stats.watching > 0" class="flex justify-between items-center px-2 py-2 rounded-lg bg-yellow-50">
            <span class="text-sm text-yellow-700">Em progresso</span>
            <span class="text-sm font-semibold text-yellow-900">{{ stats.watching }}</span>
          </div>
          <div v-if="stats.planned > 0" class="flex justify-between items-center px-2 py-2 rounded-lg bg-blue-50">
            <span class="text-sm text-blue-700">Planejando</span>
            <span class="text-sm font-semibold text-blue-900">{{ stats.planned }}</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-200">
      <p class="text-xs text-center text-gray-400">
        &copy; {{ new Date().getFullYear() }} Story Vault
      </p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#app'
import { BookOpenIcon, FilmIcon, AcademicCapIcon, TvIcon, BookOpenIcon as BookIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import { useItemsStore } from '~/stores/items'

const route = useRoute()
const store = useItemsStore() // ✅ Agora está dentro do setup(), onde o Pinia já está pronto
const { stats } = storeToRefs(store)

const navLinks = [
  { label: 'Biblioteca', to: '/library', icon: BookOpenIcon },
  { label: 'Filmes', to: '/library/movie', icon: FilmIcon },
  { label: 'Séries', to: '/library/series', icon: TvIcon },
  { label: 'Animes', to: '/library/anime', icon: AcademicCapIcon },
  { label: 'Livros', to: '/library/book', icon: BookIcon },
]

const isActive = (path: string) => {
  if (path === '/library') {
    return route.path === '/library'
  }
  return route.path.startsWith(path)
}
</script>