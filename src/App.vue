<script setup>
import { onMounted } from 'vue'
// import { useMenuStore } from './store/menuStore'
import { useMenu } from '../composables/useMenu'
import Hero from '@/components/Hero.vue'
import Navigation from '@/components/Navigation.vue'
import Promos from '@/components/Promos.vue'
import Catalog from '@/components/Catalog.vue'
import ModalCart from '@/components/ModalCart.vue'
import ModalItem from '@/components/ModalItem.vue'
import { defineAsyncComponent } from 'vue'

const Map = defineAsyncComponent( ()=>
  import('@/components/Map.vue')
)

const Footer = defineAsyncComponent( ()=>
  import('@/components/Footer.vue')
)

const Cart = defineAsyncComponent( ()=>
  import('@/components/Cart.vue')
)

const { retrieveProducts, info } = useMenu()

onMounted( async() => {
  await retrieveProducts()
  document.title = `${info.value.title_local} | Menu Activo`
})

</script>

<template>
  <Hero />
  <Navigation />
  <main>
    <Promos />
    <Catalog />
    <Map />
    <Footer />
    <Cart />
    <ModalCart />
    <ModalItem />
  </main>
</template>