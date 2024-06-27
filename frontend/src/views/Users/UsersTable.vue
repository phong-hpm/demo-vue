<script setup lang="ts">
import { createColumnHelper } from '@tanstack/vue-table';

import type { TUser } from '@/types/User.vue';

import Table from '@/components/Table/Table.vue';
import type { TPaginationData } from '@/hooks/usePaginationData';

interface UsersTableProps {
  paginationData: TPaginationData<TUser>;
}

const { paginationData } = defineProps<UsersTableProps>();
const { loading, data: userList } = paginationData || {};

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
  columnHelper.accessor('id', {
    header: '',
    cell: (data) => data.getValue(),
  }),
];
</script>

<template>
  <Table class="max-h-[calc(100vh-130px)]" :loading="loading" :data="userList" :columns="columns" />
</template>
