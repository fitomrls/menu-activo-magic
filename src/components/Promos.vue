<script setup>
import { useMenu } from '../../composables/useMenu';

const { featured, setProduct } = useMenu()

</script>
<template>
  <section class="promos flex-col" id="promos">
    <div class="line"></div>
    <h2>Promos de la Semana</h2>
    <div class="content flex">
        <div class="box-item" v-for="promo in featured" :key="promo.id">
            <img class="box-img" :src="promo.pictures[0].url" :alt="promo.title">
            <div class="item-info">
                <div class="name" v-if="promo.title.length>24">{{ promo.title.slice(0, 24) }}</div>
                <div class="name" v-else>{{ promo.title }}</div>
                <div class="price flex">Precio&nbsp; <div class="num">{{ promo.price_sale }}</div> <div class="bs">Bs</div></div>
            </div>
            <a class="action" @click="setProduct(promo)">
                <img src="@/assets/img/plus-circle.svg" alt="plus icon">
            </a>
        </div>
    </div>
  </section>
</template>
