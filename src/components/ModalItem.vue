<script setup>
import { useMenu } from '../../composables/useMenu'
import { ref } from 'vue'

const { 
        isProductSelected, 
        disposeProduct, 
        productSelected, 
        addToCart, 
        cartShowing,
        totalCartItems
      } =useMenu()

const amount = ref(1)

const showCart =()=>{
    disposeProduct()

    setTimeout(() => {
        cartShowing(true)
    }, 400);

}

</script>
<template>
  <div
    class="mask-modal"
    role="dialog"
    :class="isProductSelected ? 'active' : ''"
  ></div>
  <div class="modal" role="alert" :class="isProductSelected ? 'modal-active' : ''">
    <div class="product" v-if="productSelected!=null">
        <div class="imgs">
            <img class="product-img" :src="productSelected.pictures[0].url" alt="">
        </div>
        <div class="descrip">
            <h2>{{ productSelected.title }}</h2>
            <p v-html="productSelected.description"></p>

            <div class="action">
                <div class="price">
                    <div>
                        {{ productSelected.price_sale }}&nbsp;<span>Bs</span>
                    </div>
                    <input class="amount-item" v-model="amount" type="number" min="1" max="20" id="amount-sale" autocomplete="off">
                </div>
                <div class="add" @click="addToCart(amount)">
                    Agregar al Carrito
                </div>
            </div>
        </div>
        <div class="side-cart"  @click="showCart">
            <div class="cart-action-side">
                <span class="flex flex-center">{{ totalCartItems }}</span>
                <img src="@/assets/img/cart.svg" alt="cart-icon">
            </div>
        </div>
    </div>
    <button class="close-modal" role="button" @click="disposeProduct">x</button>
  </div>
</template>
