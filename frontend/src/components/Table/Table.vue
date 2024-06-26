<script setup lang="ts">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type AccessorKeyColumnDef,
} from '@tanstack/vue-table';

interface TableProps<T> {
  data: T[];
  columns: AccessorKeyColumnDef<T, string>[];
}

const props = defineProps<TableProps<any>>();

const table = useVueTable({
  get data() {
    return props.data || [];
  },
  columns: props.columns || [],
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
    <div class="max-h-full w-full overflow-auto">
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
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody>
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
      </table>
    </div>
  </div>
</template>
