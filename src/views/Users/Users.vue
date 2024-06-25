<script setup lang="ts">
import { ref } from 'vue';
import { createColumnHelper } from '@tanstack/vue-table';
import { faker } from '@faker-js/faker';
import _ from 'lodash';

import type { TUser } from '@/types/User.vue';

import Table from '@/components/Table/Table.vue';
import Drawer from '@/components/Drawer/Drawer.vue';
import Button from '@/components/Button.vue';
import TextField from '@/components/TextField.vue';

const mockData: TUser[] = _.times(100, () => ({
  id: faker.string.nanoid(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
}));

const columnHelper = createColumnHelper<TUser>();

const columns = [
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (data) => data.getValue(),
  }),
  columnHelper.accessor('fullName', {
    header: 'Name',
    cell: (data) => data.getValue(),
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone',
    cell: (data) => data.getValue(),
  }),
];

const openModal = ref(false);
const values = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
});

const handleSubmit = () => {
  console.log(values.value);
};
</script>

<template>
  <div class="flex items-center justify-between p-6">
    <p class="text-4xl font-bold">Users</p>
    <Button @click="openModal = true">New user</Button>
  </div>

  <Drawer v-if="openModal" title="Add user" @close="openModal = false">
    <div class="flex flex-col gap-6">
      <TextField label="Name" v-model:value="values.fullName" />
      <TextField label="Email" v-model:value="values.email" />
      <TextField label="Phone" v-model:value="values.phoneNumber" />
    </div>

    <template v-slot:footer>
      <Button @click="handleSubmit">Submit</Button>
    </template>
  </Drawer>

  <div class="p-4">
    <Table class="max-h-[calc(100vh-130px)]" :data="mockData" :columns="columns" />
  </div>
</template>
