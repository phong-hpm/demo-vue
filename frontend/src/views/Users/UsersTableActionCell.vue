<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { TrashIcon, PencilSquareIcon } from '@heroicons/vue/24/outline';

import type { TUser } from '@/types/User.vue';
import axiosInstance from '@/utils/axios';

import Button from '@/components/Button.vue';

import UserFormDrawer from './UserFormDrawer.vue';

interface UsersTableActionCellProps {
  user: TUser;
  onUpdate: (entity: TUser) => void;
  onDelete: (id: string) => void;
}

const props = defineProps<UsersTableActionCellProps>();

const toast = useToast();

const openFormModal = ref(false);
const deleting = ref(false);

const handleDeleteUser = async () => {
  const confirmMessage = `Do you want to delete User '${props.user.firstName} ${props.user.lastName}'?`;
  if (!confirm(confirmMessage)) return;

  deleting.value = true;

  try {
    await axiosInstance.delete(`users/${props.user.id}`);
    props.onDelete(props.user.id);
    toast.success('Delete successfully');
  } catch {
    toast.error('Delete failed');
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <div class="flex justify-end gap-4">
    <Button :icon="true" @click="openFormModal = true">
      <PencilSquareIcon class="size-4" />
    </Button>
    <Button :loading="deleting" :icon="true" color="danger" @click="handleDeleteUser">
      <TrashIcon class="size-4" />
    </Button>
  </div>

  <UserFormDrawer
    v-if="openFormModal"
    :open="openFormModal"
    :user="user"
    @update="onUpdate"
    @close="openFormModal = false"
  />
</template>
