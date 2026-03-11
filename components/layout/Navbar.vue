<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo e Título -->
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" @click="navigateTo('/library')">
            <BookOpenIcon class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 leading-tight cursor-pointer" @click="navigateTo('/library')">
              Story Vault
            </h1>
            <p class="text-xs text-gray-500 hidden sm:block">Seu hub de entretenimento</p>
          </div>
        </div>

        <!-- Botão de menu mobile -->
        <div class="flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none transition-transform duration-300"
            :class="{ 'rotate-90': mobileMenuOpen }"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>

        <!-- Links de navegação (desktop) -->
        <div class="hidden sm:flex items-center space-x-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="{
              'bg-blue-50 text-blue-700 border-b-2 border-blue-600': isActive(link.to),
              'text-gray-600 hover:bg-blue-50/50 hover:text-blue-700': !isActive(link.to)
            }"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- Menu mobile -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0 overflow-hidden"
        enter-to-class="max-h-64 opacity-100 overflow-hidden"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-64 opacity-100 overflow-hidden"
        leave-to-class="max-h-0 opacity-0 overflow-hidden"
      >
        <div
          v-if="mobileMenuOpen"
          class="sm:hidden bg-white border-t border-gray-200"
        >
          <div class="px-2 pt-2 pb-4 space-y-1">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="block px-3 py-3 rounded-lg text-base font-medium transition-colors"
              :class="{
                'bg-blue-50 text-blue-700': isActive(link.to),
                'text-gray-600 hover:bg-gray-50 hover:text-gray-900': !isActive(link.to)
              }"
              @click="mobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </transition>

      <!-- Overlay para fechar menu mobile ao clicar fora -->
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/20 z-30 sm:hidden"
        @click="mobileMenuOpen = false"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpenIcon, Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useRoute } from '#app'
import { navigateTo } from '#app'

const route = useRoute()

const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Biblioteca', to: '/library' },
  { label: 'Filmes', to: '/library/movie' },
  { label: 'Séries', to: '/library/series' },
  { label: 'Animes', to: '/library/anime' },
  { label: 'Livros', to: '/library/book' },
]

const isActive = (path: string) => {
  if (path === '/library') {
    return route.path === '/library'
  }
  return route.path.startsWith(path)
}
</script>