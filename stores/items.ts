import { defineStore } from 'pinia'
import type { LibraryItem, ItemType } from '~/types/items'

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as LibraryItem[],
  }),

  getters: {
    itemsByType: (state) => (type: ItemType) => state.items.filter(i => i.type === type),
    stats: (state) => ({
      total: state.items.length,
      completed: state.items.filter(i => i.status === 'completed').length,
      watching: state.items.filter(i => ['watching', 'reading'].includes(i.status)).length,
      planned: state.items.filter(i => i.status === 'planning').length,
    }),
  },

  actions: {
    addItem(item: Omit<LibraryItem, 'id' | 'createdAt'>) {
      this.items.push({
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })
    },

    updateItem(id: string, updates: Partial<LibraryItem>) {
      const index = this.items.findIndex(i => i.id === id)
      if (index !== -1) {
        // ✅ CORREÇÃO: Substitui o item *com new reference* para manter reatividade
        this.items = this.items.map((item, i) =>
          i === index ? { ...item, ...updates } : item
        )
      }
    },

    deleteItem(id: string) {
      // ✅ CORREÇÃO: filtra e cria novo array (reativo)
      this.items = this.items.filter(i => i.id !== id)
    },

    seedMockData() {
      if (this.items.length === 0) {
        this.addItem({
          title: 'Breaking Bad',
          type: 'series',
          status: 'watching',
          progress: { season: 2, episode: 4 },
          rating: 5,
          notes: 'Excelente desenvolvimento do Walter',
          where: 'Netflix',
          coverImage: '/images/breaking-bad.jpg',
        })
      }
    },
  },
})