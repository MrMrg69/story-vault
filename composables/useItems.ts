import { useItemsStore } from '~/stores/items'
import { computed } from 'vue'

export const useItems = () => {
  // ✅ Só chama o store dentro de uma função (quando o Pinia já está pronto)
  const getStore = () => useItemsStore()

  // Carrega dados mock apenas se estiver no client e vazio
  if (import.meta.client) {
    const store = getStore()
    if (store.items.length === 0) {
      store.seedMockData()
    }
  }

  return {
    items: computed(() => getStore().items),
    addItem: getStore().addItem,
    updateItem: getStore().updateItem,
    deleteItem: getStore().deleteItem,
    stats: computed(() => getStore().stats),
  }
}