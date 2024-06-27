<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  color?: 'transparent' | 'primary';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
});
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-lg border px-5 py-1.5 text-sm font-semibold transition-all"
    :class="[
      !props.disabled && color === 'transparent' && 'border-gray-900 text-gray-900',
      !props.disabled && color === 'primary' && 'border-gray-900 bg-gray-900 text-white',
      loading && 'cursor-not-allowed',
      props.disabled && 'cursor-not-allowed bg-gray-200 text-gray-500',
    ]"
    :disabled="props.disabled"
  >
    <Spinner class="h-4 w-4" :show="loading" />

    <slot />
  </button>
</template>
