<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as Yup from 'yup';

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
  lastName: Yup.string().email().required('is_required'),
  email: Yup.string().email().required('is_required'),
});

interface AddUserFormProps {
  open: boolean;
  onClose: () => void;
}

const { onClose } = defineProps<AddUserFormProps>();

const { handleSubmit } = useForm<FormData>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <Drawer v-if="open" title="New user" @submit="onSubmit" @close="onClose">
    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-2 gap-6">
        <TextField required="true" label="First name" name="firstName" />
        <TextField required="true" label="Last name" name="lastName" />
      </div>
      <TextField required="true" label="Email" name="email" />
      <TextField label="Phone" name="phoneNumber" />
    </div>
    <template v-slot:footer>
      <Button type="submit">Submit</Button>
    </template>
  </Drawer>
</template>
