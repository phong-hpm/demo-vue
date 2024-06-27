<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type AccessorKeyColumnDef,
} from '@tanstack/vue-table';

import Spinner from '@/components/Spinner.vue';

interface TableProps<T> {
  loading?: boolean;
  loadingMore?: boolean;
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
  onLoadMore?: () => void;
}

const props = defineProps<TableProps<any>>();

const table = useVueTable({
  get data() {
    return props.data || [];
  },
  columns: props.columns || [],
  getCoreRowModel: getCoreRowModel(),
});

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  if (props.loadingMore || target.scrollTop + target.offsetHeight < target.scrollHeight) return;
  props.onLoadMore?.();
};
</script>

<template>
  <div
    class="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4"
  >
    <div class="max-h-full w-full overflow-auto" @scroll="handleScroll">
      <table class="w-full">
        <thead class="text-xs uppercase text-gray-300">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="border-b-2 border-gray-100"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              class="sticky top-0 z-10 bg-white p-3 text-left font-bold text-[#9ba6ae]"
              :style="{ width: header.getSize() ? `${header.getSize()}px` : '' }"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="border-b border-gray-200 text-sm even:bg-gray-50"
          >
            <td v-for="cell in row.getVisibleCells()" :key="cell.id" class="p-3">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>

        <tbody v-if="loading">
          <tr>
            <td :colSpan="table.getAllColumns().length">
              <div class="flex h-16 w-full items-center justify-center py-16">
                <Spinner :show="true" class="h-10 w-10 !text-gray-900" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="loadingMore" class="absolute bottom-4 left-1/2 -translate-x-1/2">
      <div
        class="flex h-[30px] w-[180px] justify-center rounded-t-md border-gray-900 bg-gray-900 px-4 py-2 text-xs"
      >
        <Spinner :show="true" class="size-4" />
      </div>
    </div>
  </div>
</template>
