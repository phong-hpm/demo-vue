<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'vue-toast-notification';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { faker } from '@faker-js/faker';

import type { TUser } from '@/types/User.vue';
import axiosInstance from '@/utils/axios';

import Drawer from '@/components/Drawer/Drawer.vue';
import Button from '@/components/Button.vue';
import TextField from '@/components/TextField.vue';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('is_required'),
  lastName: Yup.string().required('is_required'),
  email: Yup.string().email('invalid_email').required('is_required'),
});

interface AddUserFormProps {
  open: boolean;
  user?: TUser;
  onUpdate: (entity: TUser) => void;
  onClose: () => void;
}

const { user, onUpdate, onClose } = defineProps<AddUserFormProps>();

const toast = useToast();

const { setValues, handleSubmit } = useForm<FormData>({
  validationSchema,
  initialValues: {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber,
  },
});

const loading = ref(false);

const handleRandom = () => {
  setValues({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
  });
};

const onSubmit = handleSubmit(async (data) => {
  try {
    loading.value = true;
    const response = await axiosInstance<TUser>({
      method: user ? 'put' : 'post',
      url: user ? `users/${user.id}` : 'users',
      data,
    });
    toast.success(user ? 'Edit successfully' : 'Add successfully');
    onUpdate(response.data);
    onClose?.();
  } catch {
    toast.error(user ? 'Edit failed' : 'Add failed');
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Drawer
    v-if="open"
    :title="user ? 'Update user' : 'New user'"
    @submit="onSubmit"
    @close="onClose"
  >
    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-2 gap-6">
        <TextField required="true" label="First name" name="firstName" />
        <TextField required="true" label="Last name" name="lastName" />
      </div>
      <TextField required="true" label="Email" name="email" />
      <TextField label="Phone" name="phoneNumber" />
    </div>
    <template v-slot:footer>
      <div class="flex w-full justify-between">
        <Button :disabled="loading" color="transparent" type="button" @click="handleRandom">
          Random
        </Button>
        <Button :loading="loading" type="submit">Submit</Button>
      </div>
    </template>
  </Drawer>
</template>
