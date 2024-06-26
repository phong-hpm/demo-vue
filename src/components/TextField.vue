<script setup lang="ts">
import { defineProps, toRef } from 'vue';
import { useField } from 'vee-validate';

import { getError } from '@/utils/getError';

export interface TextFieldProps {
  required?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  name: string;
  value?: string;
}

const props = defineProps<TextFieldProps>();

const name = toRef(props, 'name');

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(name);
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="mb-2 flex text-xs font-semibold"
      :class="[errorMessage ? 'text-red-500' : 'text-gray-900']"
    >
      <span>{{ label }}</span>
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <input
      class="focus:border-primary-500 active:border-primary-500 w-full rounded-lg border bg-white p-3 text-xs font-medium placeholder-gray-400 outline-none"
      :class="[errorMessage ? 'border-red-500' : 'border-gray-200']"
      :id="name"
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder ? `${placeholder}...` : `Enter ${label?.toLowerCase()}...`"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="mt-1 text-xs text-red-500" v-show="errorMessage">
      {{ getError(errorMessage) }}
    </p>
  </div>
</template>
