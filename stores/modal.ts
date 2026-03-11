import { defineStore } from 'pinia'
import type { LibraryItem } from '~/types/items'

export const useModalStore = defineStore('modal', {
  state: () => ({
    editingItem: null as LibraryItem | null,
    isOpen: false,
  }),

  actions: {
    openEdit(item: LibraryItem) {
      this.editingItem = item
      this.isOpen = true
    },
    close() {
      this.isOpen = false
      this.editingItem = null
    },
  },
})