<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';

interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  icon?: boolean;
  color?: 'transparent' | 'primary' | 'danger';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'primary',
});
</script>

<template>
  <button
    class="flex items-center gap-2 rounded-lg transition-all"
    :class="[
      icon
        ? [
            'bg-opacity-5 p-1.5 hover:bg-opacity-10',
            color === 'transparent' && 'hover:bg-gray-900',
            color === 'primary' && 'border-gray-900 bg-gray-900 text-gray-900',
            color === 'danger' && 'bg-red-500 text-red-500',
          ]
        : [
            'border px-5 py-1.5 text-sm font-semibold',
            color === 'transparent' && 'border-gray-900 text-gray-900',
            color === 'primary' && 'border-gray-900 bg-gray-900 text-white',
            color === 'danger' && 'border-red-500 bg-red-500 text-white',
          ],
      loading && '!cursor-not-allowed',
      disabled && '!cursor-not-allowed !border-gray-200 !bg-gray-200 !text-gray-500',
    ]"
    :disabled="props.disabled"
  >
    <Spinner class="h-4 w-4" :class="[icon && '!text-gray-900']" :show="loading" />

    <slot v-if="!icon || !loading" />
  </button>
</template>
