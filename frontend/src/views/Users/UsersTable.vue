<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';

import type { TUser } from '@/types/User.vue';
import axiosInstance from '@/utils/axios';

import Table from '@/components/Table/Table.vue';

const columnHelper = createColumnHelper<TUser>();

const columns = [
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (data) => data.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: 'Name',
    cell: (data) => `${data.row.original.firstName} ${data.row.original.lastName}`,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone',
    cell: (data) => data.getValue(),
  }),
];

const userList = ref<TUser[]>([]);

const fetchUserList = async () => {
  try {
    const response = await axiosInstance.get<TUser[]>('users');
    userList.value = response.data;
  } catch {
    userList.value = [];
  }
};

onMounted(() => {
  fetchUserList();
});
</script>

<template>
  <div class="p-4">
    <Table class="max-h-[calc(100vh-130px)]" :data="userList" :columns="columns" />
  </div>
</template>
