<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface TextFieldProps {
  label?: string;
  placeholder?: string;
  name?: string;
  value: string | number;
}

const { label, placeholder, value } = defineProps<TextFieldProps>();

const emits = defineEmits<{
  (event: 'update:value', value: string): void;
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits('update:value', target.value);
};
</script>

<template>
  <div>
    <label v-if="label" :for="name" class="mb-2 block text-xs font-semibold text-gray-900">{{
      label
    }}</label>
    <input
      class="focus:border-primary-500 active:border-primary-500 w-full rounded-lg border border-gray-200 bg-white p-3 text-xs font-medium placeholder-gray-400 outline-none"
      :id="name"
      :name="name"
      :value="value"
      :placeholder="placeholder ? `${placeholder}...` : `Enter ${label}...`"
      @input="handleInput"
    />
  </div>
</template>
