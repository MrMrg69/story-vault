<template>
  <Dialog as="div" class="relative z-50" @close="onClose">
    <div class="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />

    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
        <slot name="header">
          <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900">
            Título do Modal
          </DialogTitle>
        </slot>

        <div class="mt-4">
          <slot />
        </div>

        <div class="mt-6 flex justify-end">
          <slot name="footer" />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

defineProps<{
  onClose?: () => void
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>