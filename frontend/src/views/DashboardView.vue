<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid';

import BoxContainer from '@/components/BoxContainer.vue';
</script>

<template>
  <main>
    <div class="grid grid-cols-3 gap-6">
      <BoxContainer title="Message">
        <template v-slot:icon>
          <PlusIcon class="size-4" />
        </template>
        <div>body</div>
      </BoxContainer>
    </div>
  </main>
</template>
