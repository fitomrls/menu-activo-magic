<script setup>
import { onMounted, ref } from 'vue'
import { useMenu } from '../../composables/useMenu'
const { info } = useMenu()

const atention = ref(null)

onMounted(() => {
    if(info.value!=null){
        atention.value = JSON.parse(info.value.atention)
    }
    /* setTimeout(() => {
        atention.value = JSON.parse(info.value.atention)
    }, 1000) */
})

</script>
<template>
  <footer class="flex" v-if="info!=null">
    <div class="address">
        <p><strong>{{ info.title_local }}</strong></p>
        <p>Direcci&oacute;n: <strong>{{ info.address }}</strong></p>
        <p>Tel&eacute;fono: <strong>{{ info.phone }}</strong></p>
    </div>
    <div class="central flex">
        <div class="social">
            <a v-for="social in info.socials" :href="social.link" target="_blank" :key="social.id">
                <img src="@/assets/img/facebook.svg" alt="location icon" width="45" height="45">
            </a>
            <a :href="`https://wa.me/+591${info.phone}`" target="_blank">
                <img src="@/assets/img/whatsapp.svg" alt="location icon" width="45" height="45">
            </a>
            <a href="https://devematic.com" target="_blank" class="flex menu-activo">
                Powered by
                <img src="@/assets/img/devematic.svg" alt="location icon" width="30" height="30">
            </a>
        </div>
    </div>
    <div class="time flex">
        <img v-if="info.logo==null" id="logo-footer" src="@/assets/logo-min.svg" alt="logo-menu-activo">
        <img v-else id="logo-footer" :src="info.logo" :alt="`logo ${info.title_local}`">
        <p v-if="atention!=null">Abrimos: <br> <strong>L-D {{ atention.open }} a {{ atention.close }}</strong></p>
    </div>
  </footer>
</template>
