<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="relative flex">
    <RouterView name="leftSidebar" class="shrink-0" />
    <div class="grow p-6 mr-14"><RouterView /></div>
    <RouterView name="rightSidebar" class="shrink-0" />
  </div>
</template>
