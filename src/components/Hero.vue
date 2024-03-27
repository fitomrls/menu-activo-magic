<script setup>
import { useMenu } from '../../composables/useMenu';
const { info } = useMenu()
</script>
<template>
  <header class="flex center">
      <div class="gradient"></div>
      <template v-if="info==null">
        <img id="logo-hero" src="@/assets/logo.svg" alt="logo menu-activo">
      </template>
      <template v-else>
        <img v-if="info.logo!=null" id="logo-hero" :src="info.logo" alt="logo menu-activo">
      </template>
  </header>
</template>