<script setup lang="ts">
import { h } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';

import type { TUser } from '@/types/User.vue';
import type { TPaginationData } from '@/hooks/usePaginationData';

import Table from '@/components/Table/Table.vue';

import ActionCell from './UsersTableActionCell.vue';

interface UsersTableProps {
  paginationData: TPaginationData<TUser>;
}

const { paginationData } = defineProps<UsersTableProps>();
const { loading, loadingMore, data: userList, onLoadMore } = paginationData || {};

const columnHelper = createColumnHelper<TUser>();

const columns = [
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (data) => data.getValue(),
    size: 1000,
  }),
  columnHelper.accessor('firstName', {
    header: 'Name',
    cell: (data) => `${data.row.original.firstName} ${data.row.original.lastName}`,
    size: 1000,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone',
    cell: (data) => data.getValue(),
    size: 500,
  }),
  columnHelper.accessor('id', {
    header: 'Actions',
    cell: (data) =>
      h(ActionCell, {
        user: data.row.original,
        onUpdate: paginationData.onUpdate,
        onDelete: paginationData.onDelete,
      }),
    size: 100,
  }),
];
</script>

<template>
  <Table
    class="max-h-[calc(100vh-120px)]"
    :loading="loading"
    :loadingMore="loadingMore"
    :data="userList"
    :columns="columns"
    @loadMore="onLoadMore"
  />
</template>
