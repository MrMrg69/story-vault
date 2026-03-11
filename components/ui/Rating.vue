<template>
  <div class="flex">
    <StarIcon
      v-for="i in max"
      :key="i"
      class="w-6 h-6 cursor-pointer transition-colors"
      :class="i <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-200'"
      @click="update(i)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { StarIcon as StarOutlineIcon } from '@heroicons/vue/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'

// ✅ Aceita null, undefined e number
const props = defineProps<{
  modelValue: number | null | undefined
  max?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const max = computed(() => props.max ?? 5)

// ✅ Trata null/undefined como 0
const currentRating = computed(() => {
  const value = props.modelValue
  return value == null ? 0 : value
})

function update(rating: number) {
  emit('update:modelValue', rating)
}
</script>