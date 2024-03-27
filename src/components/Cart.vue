<script setup>
import { useMenu } from '../../composables/useMenu'
const { cartShowing, totalCartItems } = useMenu()

</script>
<template>
    <div class="cart-area">
        <div class="cart-icon" @click="cartShowing(true)">
            <span class="flex flex-center">{{ totalCartItems }}</span>
            <img id="cart-cion" src="@/assets/img/cart.svg" alt="cart-icon">
        </div>
    </div>
</template>