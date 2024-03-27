<script setup>
// import { onMounted, ref } from 'vue'
import { useMenu } from '../../composables/useMenu'
const { info } = useMenu()

/* onMounted(() => {
    setTimeout(() => {
        atention.value = JSON.parse(info.value.atention)
    }, 1000)
}) */

</script>
<template>
    <section v-if="info!=null" class="map" v-html="info.gmaps" />
</template>
