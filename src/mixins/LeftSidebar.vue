<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { UsersIcon, LinkIcon, ArrowUturnLeftIcon, AcademicCapIcon } from '@heroicons/vue/24/solid';

const itemList = [
  { label: 'Users', to: '/users', icon: UsersIcon },
  { label: 'About', to: '/about', icon: LinkIcon },
];
</script>

<template>
  <div
    class="sticky top-0 z-10 flex h-screen w-64 flex-col overflow-hidden bg-gray-900 px-2 text-white"
  >
    <div class="flex flex-col items-center gap-4 px-4 py-8">
      <AcademicCapIcon class="size-16" />
      <p class="text-xl font-bold text-gray-400">Demo VueJS</p>
    </div>
    <div class="grow overflow-auto border-y border-gray-600 py-4">
      <RouterLink
        v-for="item in itemList"
        :key="item.label"
        :to="item.to"
        class="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-800"
      >
        <component :is="item.icon" class="size-4 text-gray-300" />
        <p class="text-gray-300">{{ item.label }}</p>
      </RouterLink>
    </div>

    <div class="shrink-0 py-4">
      <div class="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-800">
        <ArrowUturnLeftIcon class="size-4 text-gray-300" />
        <p class="text-gray-300">Logout</p>
      </div>
    </div>
  </div>
</template>
