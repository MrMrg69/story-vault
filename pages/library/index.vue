<template>
  <div class="space-y-6">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Minha Biblioteca</h1>
      <Button
        variant="primary"
        class="flex items-center gap-2"
        @click="openAddModal"
      >
        <PlusIcon class="w-5 h-5" />
        Adicionar Novo
      </Button>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ItemCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @edit="openEditModal"
        @delete="onDeleteItem"
      />
    </div>

    <!-- Modal Global -->
    <Modal v-if="modalStore.isOpen" @close="modalStore.close">
      <template #header>
        <h3 class="text-lg font-semibold">
          {{ modalStore.editingItem ? 'Editar Item' : 'Adicionar Item' }}
        </h3>
      </template>

      <form class="space-y-4" @submit.prevent="saveItem">
        <div>
          <label class="block text-sm font-medium text-gray-700">Título</label>
          <input
            v-model="form.title"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            v-model="form.type"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="movie">Filme</option>
            <option value="series">Série</option>
            <option value="anime">Anime</option>
            <option value="book">Livro</option>
            <option value="manhwa">Manhwa</option>
            <option value="manga">Mangá</option>
            <option value="game">Jogo</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Status</label>
          <select
            v-model="form.status"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="planning">Planejando</option>
            <option value="watching">Assistindo</option>
            <option value="reading">Lendo</option>
            <option value="completed">Concluído</option>
            <option value="dropped">Abandonado</option>
          </select>
        </div>

        <div
          v-if="['series', 'anime'].includes(form.type)"
          class="flex gap-2"
        >
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Temporada</label>
            <input
              v-model.number="form.progress.season"
              type="number"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Episódio</label>
            <input
              v-model.number="form.progress.episode"
              type="number"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div
          v-else-if="['book', 'manhwa', 'manga'].includes(form.type)"
          class="flex gap-2"
        >
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Capítulo</label>
            <input
              v-model.number="form.progress.chapter"
              type="number"
              min="1"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Avaliação</label>
          <Rating v-model="form.rating" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Onde consumiu</label>
          <input
            v-model="form.where"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Comentários</label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="O que achou?"
          />
        </div>

        <div v-if="form.type === 'game'" class="flex items-center gap-2">
          <input
            id="platinated"
            v-model="form.isPlatinated"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label for="platinated" class="text-sm font-medium text-gray-700">
            Jogo platinado (todos os troféus)
          </label>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" @click="modalStore.close">
            Cancelar
          </Button>
          <Button type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { PlusIcon } from '@heroicons/vue/24/outline'
import ItemCard from '~/components/items/ItemCard.vue'
import Modal from '~/components/ui/Modal.vue'
import Rating from '~/components/ui/Rating.vue'
import Button from '~/components/ui/Button.vue'
import { useItemsStore } from '~/stores/items'
import { useModalStore } from '~/stores/modal'
import type { LibraryItem } from '~/types/items'

type ItemType =
  | 'movie'
  | 'series'
  | 'anime'
  | 'book'
  | 'manhwa'
  | 'manga'
  | 'game'

type ItemStatus =
  | 'planning'
  | 'watching'
  | 'reading'
  | 'completed'
  | 'dropped'

type FormState = {
  title: string
  type: ItemType
  status: ItemStatus
  progress: {
    season?: number
    episode?: number
    chapter?: number
  }
  rating: number
  where: string
  notes: string
  isPlatinated: boolean
}

const itemsStore = useItemsStore()
const modalStore = useModalStore()
const { items } = storeToRefs(itemsStore)

function createEmptyForm(): FormState {
  return {
    title: '',
    type: 'movie',
    status: 'planning',
    progress: {
      season: undefined,
      episode: undefined,
      chapter: undefined,
    },
    rating: 0,
    where: '',
    notes: '',
    isPlatinated: false,
  }
}

const form = reactive<FormState>(createEmptyForm())

function openAddModal() {
  modalStore.editingItem = null
  modalStore.isOpen = true
  Object.assign(form, createEmptyForm())
}

function openEditModal(item: LibraryItem) {
  modalStore.editingItem = item
  modalStore.isOpen = true
  Object.assign(form, {
    title: item.title ?? '',
    type: (item.type ?? 'movie') as ItemType,
    status: (item.status ?? 'planning') as ItemStatus,
    progress: {
      season: item.progress?.season,
      episode: item.progress?.episode,
      chapter: item.progress?.chapter,
    },
    rating: item.rating ?? 0,
    where: item.where ?? '',
    notes: item.notes ?? '',
    isPlatinated: item.isPlatinated ?? false,
  })
}

function saveItem() {
  if (!form.title.trim()) {
    alert('Título é obrigatório!')
    return
  }

  const payload = {
    ...form,
    title: form.title.trim(),
    progress: {
      season: form.progress.season,
      episode: form.progress.episode,
      chapter: form.progress.chapter,
    },
  }

  if (modalStore.editingItem) {
    itemsStore.updateItem(modalStore.editingItem.id, payload as Partial<LibraryItem>)
  } else {
    itemsStore.addItem(payload as Omit<LibraryItem, 'id' | 'createdAt'>)
  }

  modalStore.close()
}

function onDeleteItem(id: string) {
  itemsStore.deleteItem(id)
}
</script>