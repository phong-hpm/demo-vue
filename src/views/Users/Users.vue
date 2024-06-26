<script setup lang="ts">
import { ref } from 'vue';

import Button from '@/components/Button.vue';

import AddUserDrawer from './AddUserDrawer.vue';
import UsersTable from './UsersTable.vue';

const openModal = ref(false);
</script>

<template>
  <div class="flex items-center justify-between p-6">
    <p class="text-4xl font-bold">Users</p>
    <Button @click="openModal = true">New user</Button>
  </div>

  <AddUserDrawer :open="openModal" @close="openModal = false" />

  <UsersTable />
</template>
