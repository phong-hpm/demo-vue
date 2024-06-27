<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

import { type TUser } from '@/types/User.vue';
import usePaginationData from '@/hooks/usePaginationData';

import Button from '@/components/Button.vue';

import UserFormDrawer from './UserFormDrawer.vue';
import UsersTable from './UsersTable.vue';

const openModal = ref(false);

const usersPaginationData = usePaginationData<TUser>({
  url: 'users',
});
</script>

<template>
  <div class="mb-8 flex items-center justify-between">
    <p class="text-4xl font-bold">Users</p>
    <Button class="pl-3" @click="openModal = true">
      <PlusIcon class="size-4" />
      <span>New user</span>
    </Button>
  </div>

  <UsersTable :paginationData="usersPaginationData" />

  <UserFormDrawer
    :open="openModal"
    @update="usersPaginationData.onUpdate"
    @close="openModal = false"
  />
</template>
