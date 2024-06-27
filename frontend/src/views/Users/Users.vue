<script setup lang="ts">
import { ref } from 'vue';

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
  <div class="flex items-center justify-between p-6">
    <p class="text-4xl font-bold">Users</p>
    <Button @click="openModal = true">New user</Button>
  </div>

  <div class="p-4">
    <UsersTable :paginationData="usersPaginationData" />
  </div>

  <UserFormDrawer
    :open="openModal"
    @update="usersPaginationData.onUpdate"
    @close="openModal = false"
  />
</template>
