<script setup>
import { useMenu } from '../../composables/useMenu';

const { catSelected, productsByCat, setProduct } = useMenu()

</script>
<template>
    <section class="catalog flex-col" id="menu">
        <div class="title flex">
            <img id="line-title" src="@/assets/img/line.svg" alt="">
            <h1>{{ catSelected.name}}</h1>
            <img id="line-title" src="@/assets/img/line.svg" alt="">
        </div>
        <div class="content flex">
            <div class="box-item" v-for="promo in productsByCat" :key="promo.id">
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

