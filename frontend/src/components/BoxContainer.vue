<script setup lang="ts">
interface ContainerBoxProps {
  title?: string;
}

defineProps<ContainerBoxProps>();
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
    <div
      v-if="!!title"
      class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-3 py-2 font-bold"
    >
      <slot name="icon" />
      <span>{{ title }}</span>
    </div>

    <div class="p-3"><slot /></div>
  </div>
</template>
