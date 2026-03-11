<template>
  <div class="space-y-6">
    <!-- Header com botão de voltar e título -->
    <header class="flex items-center justify-between">
      <Button
        variant="primary"
        @click="navigateTo('/library')"
        class="flex items-center gap-2 text-gray-600 hover:text-blue-600"
      >
        <ArrowLeftIcon class="w-5 h-5" />
        Voltar
      </Button>
      <h1 class="text-2xl font-bold capitalize">
        {{ typeName }}
      </h1>
      <div class="w-24" /> <!-- Espaçador para centralizar -->
    </header>

    <!-- Lista de itens filtrados -->
    <div v-if="filteredItems.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-500">Nenhum item deste tipo adicionado ainda.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ItemCard
        v-for="item in filteredItems"
        :key="item.id"
        :item="item"
        @edit="editItem(item)"
        @delete="onDeleteItem(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useRoute, navigateTo } from '#app'
import { storeToRefs } from 'pinia'
import ItemCard from '~/components/items/ItemCard.vue'
import Button from '~/components/ui/Button.vue'
import { useItemsStore } from '~/stores/items'
import type { ItemType } from '~/types/items'
import type { LibraryItem } from '~/types/items'

// 🔹 Pegar o parâmetro dinâmico `id` da rota (ex: `/library/type/movie`)
const route = useRoute()
const typeId = route.params.id as ItemType

// 🔹 Obter lista completa de itens do Pinia
const store = useItemsStore() // ✅ Agora está dentro do setup()
const { items } = storeToRefs(store)

// 🔹 Filtrar itens pelo tipo
const filteredItems = computed(() =>
  items.value.filter(item => item.type === typeId)
)

// 🔹 Mapear tipo para texto legível
const typeName = computed(() => {
  const map: Record<ItemType, string> = {
    movie: 'Filmes',
    series: 'Séries',
    anime: 'Animes',
    book: 'Livros',
    manhwa: 'Manhwas',
    manga: 'Mangás',
    game: 'Jogos',
  }
  return map[typeId] ?? 'Tipo Desconhecido'
})

// 🔹 Funções para edit/delete (reutiliza lógica do library/index.vue)
const editingItem = ref(null)

function editItem(item: LibraryItem) {
  // Reutiliza o modal do library/index.vue? Não — aqui mostramos um snack ou redirecionamos
  // ✅ Solução: redireciona para library/index.vue com modal aberto
  navigateTo(`/library?edit=${item.id}`)
}

function onDeleteItem(id: string) {
  store.deleteItem(id)
}
</script>