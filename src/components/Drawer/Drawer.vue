<script setup lang="ts">
import { onMounted, reactive, ref, type VNode } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

interface ModalProps {
  title: string;
  footer?: VNode;
  size?: 'small' | 'large';
  onClose: () => void;
}

const { size = 'small', title, onClose } = defineProps<ModalProps>();

const ready = ref(false);
const styleObject = reactive({ width: '500px' });

onMounted(() => {
  setTimeout(() => (ready.value = true), 0);
});

if (size === 'small') styleObject.width = '600px';
if (size === 'large') styleObject.width = '800px';
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed left-0 right-0 top-0 z-20 h-full w-full bg-gray-900 opacity-0 transition-all"
      :class="{ '!opacity-40': ready }"
      @click="onClose"
    />
    <div
      class="fixed right-0 top-0 z-30 translate-x-full transition-all"
      :class="{ '!translate-x-0': ready }"
      :style="styleObject"
    >
      <div class="relative flex h-screen w-full flex-col overflow-hidden bg-white shadow">
        <div class="flex w-full shrink-0 justify-between gap-4 border-b border-gray-200 px-8 py-6">
          <p class="text-2xl font-bold">{{ title }}</p>
          <button class="rounded bg-gray-100 p-1 text-gray-500 hover:bg-gray-200" @click="onClose">
            <XMarkIcon class="size-6" />
          </button>
        </div>

        <div class="grow overflow-auto px-8 py-6"><slot /></div>

        <div class="flex justify-end gap-4 border-t border-gray-200 px-8 py-6">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
