<script setup>
import { computed, ref, watch } from 'vue'
import { useMenu } from '../../composables/useMenu'
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import { useReCaptcha } from 'vue-recaptcha-v3'

const { 
        isCartVisible, 
        cartShowing, 
        cart, 
        increase, 
        decrease, 
        removeItem,
        sendOrderCart
      } =useMenu()

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

const totalBs = computed(() => {
  return cart.value.reduce( (sum, elem)=> elem.price*elem.amount+sum , 0)
})

const name = ref('')
const phone = ref('')
const type = ref(null)

const loadingButton = ref({
  isActive: false
})

watch(() => phone.value, (newValue, oldValue) => {
  let value = newValue+''
    if(value.length>8){
      phone.value = value.slice(0, 8)
    }
})

const sentCart = async()=>{
  if(name.value!=''&&phone.value!=''&&cart.value.length>0&&type.value!=null){
    loadingButton.value.isActive = true

    await recaptchaLoaded()

    const tokenRecaptcha = await executeRecaptcha('login')

    await sendOrderCart({
      name: name.value,
      phone: phone.value,
      type: type.value,
      token: tokenRecaptcha
    })

    name.value=''
    phone.value=''
    type.value=null

    loadingButton.value.isActive = false
    cartShowing(false)
    
    toast("Pedido enviado con exito 🎉, en un instante nos comunicaremos contigo", {
      "theme": "auto",
      "type": "success",
      "position": "top-center",
      "dangerouslyHTMLString": true
    })
  
  }else{
    toast("Datas insufientes", {
      "theme": "auto",
      "type": "warning",
      "position": "top-center",
      "dangerouslyHTMLString": true
    })
  }
}

</script>
<template>
  <div
    class="mask-modal"
    role="dialog"
    :class="isCartVisible ? 'active' : ''"
  ></div>
  <div class="modal" role="alert" :class="isCartVisible ? 'modal-active' : ''">
    <div class="my-cart">
      <div class="table-cart">
        <h3>Carrito de Compras</h3>
        <div class="table-content">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Precio (Bs)</th>
                <th>cantidad</th>
                <th>sub-total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.id">
                <td align="center">1</td>
                <td>{{ item.title }}</td>
                <td align="right">{{ item.price }}</td>
                <td align="center" class="amount-layer">
                  <img src="@/assets/img/minus-circle.svg" class="action-img" alt="plus icon" @click="increase(item.id)">
                    <div class="amount">
                      {{ item.amount }}
                    </div>
                    <img src="@/assets/img/plus-circle.svg" class="action-img" alt="plus icon" @click="increase(item.id)">
                </td>
                <td align="right">{{ item.amount*item.price }} <span>Bs</span> </td>
                <td align="right" class="der">
                    <img src="@/assets/img/trash-can.svg" class="action-img" alt="plus icon" @click="removeItem(item.id)">        
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="details">
          <h3>Detalles del pedido</h3>
          <div class="total-info">
            <div class="total">Total:</div>
            <div class="total-bs">{{ totalBs }} &nbsp; <span id="bs">Bs</span></div>
          </div>
          <form @submit.prevent="sentCart" class="form-cart" name="form-cart" id="form-cart">
            <div class="cart-name">
              <input type="text" id="name" v-model="name" placeholder="nombre" max="70" min="3">
            </div>
            <div class="phone">
              <span>+591</span>
              <input type="number" id="phone" placeholder="celular" v-model="phone" autocomplete="off">
            </div>
            <div>
              <div class="cart-radio">
                  <input type="radio" value="delivery" id="delivery" v-model="type" autocomplete="off">
                  <label for="delivery">Delivey</label>
              </div>
              <div class="cart-radio">
                  <input type="radio" value="en-casa" id="en-casa" v-model="type">
                  <label for="en-casa">Pasar por local</label>
              </div>
            </div>
            
            <button type="submit" class="sale-confirm" :class="{ 'button--is-active' : loadingButton.isActive }" :disabled="loadingButton.isActive ? true : false">
                <span class="button__text">Hacer Pedido &#x2192;</span>
            </button>
          </form>
      </div>
    </div>
    <button class="close-modal" role="button" @click="cartShowing(false)">x</button>
  </div>
</template>
