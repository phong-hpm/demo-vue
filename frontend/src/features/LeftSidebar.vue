<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import {
  UsersIcon,
  LinkIcon,
  ArrowUturnLeftIcon,
  AcademicCapIcon,
  PresentationChartBarIcon,
} from '@heroicons/vue/24/outline';

const itemList = [
  { label: 'Dashboard', to: '/', icon: PresentationChartBarIcon },
  { label: 'Users', to: '/users', icon: UsersIcon },
  { label: 'About', to: '/about', icon: LinkIcon },
];

const route = useRoute();
</script>

<template>
  <div
    class="sticky top-0 z-10 flex h-screen w-64 flex-col overflow-hidden bg-gray-900 px-2 text-white"
  >
    <RouterLink class="flex flex-col items-center gap-4 px-4 py-8" to="/">
      <AcademicCapIcon class="size-16" />
      <p class="text-xl font-bold text-gray-400">Demo VueJS</p>
    </RouterLink>

    <div class="flex grow flex-col gap-1 overflow-auto border-y border-gray-800 py-4">
      <RouterLink
        v-for="item in itemList"
        :key="item.label"
        :to="item.to"
        class="flex cursor-pointer items-center gap-2 rounded-lg p-3"
        :class="[
          route.path === item.to
            ? 'bg-gray-800 text-white'
            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
        ]"
      >
        <component :is="item.icon" class="size-4" />
        <p class="text-sm">{{ item.label }}</p>
      </RouterLink>
    </div>

    <div class="shrink-0 py-4">
      <div
        class="flex cursor-pointer items-center gap-2 rounded-lg p-3 text-gray-300 hover:bg-gray-800"
      >
        <ArrowUturnLeftIcon class="size-4" />
        <p class="text-sm">Logout</p>
      </div>
    </div>
  </div>
</template>
