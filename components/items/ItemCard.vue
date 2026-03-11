<template>
  <div class="flex flex-col bg-white rounded-lg shadow p-4 transition hover:shadow-md">
    <div class="flex items-start gap-4">
      <div v-if="item.coverImage" class="w-24 h-32 object-cover rounded-md bg-gray-200 flex-shrink-0">
        <img :src="item.coverImage" alt="Capa" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs uppercase font-bold tracking-wider text-blue-600">{{ typeLabel }}</span>
          <span class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {{ statusLabel }}
          </span>
        </div>

        <h3 class="text-lg font-semibold truncate text-gray-900">{{ item.title }}</h3>

        <div v-if="item.progress" class="mt-2 text-sm text-gray-600">
          <template v-if="item.progress.season">S{{ item.progress.season }}</template>
          <template v-if="item.progress.episode">Ep {{ item.progress.episode }}</template>
          <template v-if="item.progress.chapter">Ch {{ item.progress.chapter }}</template>
          <template v-if="item.progress.page">Pág {{ item.progress.page }}</template>
        </div>

        <div v-if="item.rating !== undefined" class="mt-1 flex items-center gap-1">
          <Rating :model-value="item.rating" @update:model-value="updateRating" />
          <span class="text-sm text-gray-500">({{ item.rating }})</span>
        </div>

        <div v-if="item.where" class="mt-1 text-sm text-gray-500">
          📺 {{ item.where }}
        </div>

        <div v-if="item.notes" class="mt-2 text-sm text-gray-600 line-clamp-2">
          “{{ item.notes }}”
        </div>
      </div>
    </div>

    <div class="mt-3 flex gap-2 justify-end">
      <Button variant="outline" @click="$emit('edit', item)">Editar</Button>
      <Button variant="danger" @click="$emit('delete', item.id)">Excluir</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Rating from '~/components/ui/Rating.vue'
import Button from '~/components/ui/Button.vue'
import type { LibraryItem } from '~/types/items'
import { useItemsStore } from '~/stores/items'

const props = defineProps<{ item: LibraryItem }>()
const emit = defineEmits<{
  (e: 'edit', item: LibraryItem): void
  (e: 'delete', id: string): void
}>()

const store = useItemsStore()

const typeLabel = computed(() => {
  const labels: Record<LibraryItem['type'], string> = {
    movie: 'Filme',
    series: 'Série',
    anime: 'Anime',
    book: 'Livro',
    manhwa: 'Manhwa',
    manga: 'Mangá',
    game: 'Jogo',
  }
  return labels[props.item.type] || '—'
})

const statusLabel = computed(() => {
  const labels: Record<LibraryItem['status'], string> = {
    completed: 'Concluído',
    watching: 'Assistindo',
    reading: 'Lendo',
    planning: 'Planejando',
    dropped: 'Abandonado',
  }
  return labels[props.item.status] || '—'
})

function updateRating(value: number) {
  // Atualiza a avaliação no store
  store.updateItem(props.item.id, { rating: value })
}

// ✅ NOVO: Função para alternar status (clique no card)
function toggleStatus() {
  const nextStatus = getNextStatus(props.item.status)
  if (nextStatus) {
    store.updateItem(props.item.id, { status: nextStatus })
  }
}

// ✅ NOVO: Lógica de transição de status
function getNextStatus(currentStatus: LibraryItem['status']): LibraryItem['status'] | null {
  const transitions: Record<LibraryItem['status'], LibraryItem['status'] | null> = {
    planning: 'watching',
    watching: 'completed',
    reading: 'completed',
    completed: 'planning',
    dropped: 'planning',
  }
  return transitions[currentStatus] ?? null
}

// ✅ NOVO: Função para alternar "jogo platinado"
function togglePlatinated() {
  if (props.item.type === 'game') {
    store.updateItem(props.item.id, { isPlatinated: !props.item.isPlatinated })
  }
}
</script>