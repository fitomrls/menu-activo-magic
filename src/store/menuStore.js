import { defineStore } from "pinia"
import { toast } from "vue3-toastify"
import "vue3-toastify/dist/index.css"
import axios from 'axios'

export const useMenuStore = defineStore('menu-store',{
    

    state: () =>({
        products: [],
        cart: [],
        scrollBg: '',
        categories: [],
        productSelected: null,
        local: null,
        catSelected: {
            id: 0,
            name: 'Menú'
        },
        showCart: false

    }),

    getters: {
        getProducts: state => state.products.filter(elem=>elem.type==null),
        getCart: state => state.cart,
        getScrollBg: state => state.scrollBg,
        getFeatured: state => state.products.filter(elem=>elem.type=='promo'),
        getCategories: state => state.categories,
        getTotal: state => state.cart.reduce((sum, elem) => sum + elem.price * elem.amount, 0),
        getTotalItems: state => state.cart.reduce( (suma, elem)=> suma+elem.amount,0 ),
        isProductSelected: state => state.productSelected!=null,
        getProductSelected: state => state.productSelected,
        getInfo: state => state.local,
        getCatSelected: state => state.catSelected,
        getProductsByCat: state => {
            if(state.catSelected.id==0){
                return state.products.filter(elem=>elem.type!='promo')
            }else{
                return state.products.filter(elem=>elem.type!='promo'&&elem.category_id==state.catSelected.id)
            }
        },
        isCartVisible: state => state.showCart==true,
        totalCartItems:  state=> state.cart.reduce( (sum, elem)=> sum + elem.amount, 0 )
    },

    actions: {
        async retrieveProducts(){
            const uri = `${ import.meta.env.VITE_BASE_API }catalogo/${ import.meta.env.VITE_TOKEN}`

            const resp = await axios.get(uri).catch( (error)=> error.data )
            // const resp = await fetch(uri).catch( (error)=> error.data )
            // const data = await resp.json()
            this.products = resp.data.products
            this.categories = resp.data.categories
            this.local = resp.data.info
        },

        setScrollbg(data){
            this.scrollBg=data
        },

        addToCart(amount){
            console.log(amount)
            if(this.productSelected!=null){
                const prod = this.cart.find(elem=> elem.id==this.productSelected.id)

                if(prod==undefined){
                    this.cart.push({
                        id: this.productSelected.id,
                        title: this.productSelected.title,
                        amount: amount==''? 1: amount,
                        price: this.productSelected.price_sale
                    })

                }else{
                    prod.amount = Number(prod.amount+amount)
                }

                toast('Agregado con exito 🎉', {
                    'theme': 'auto',
                    'type': 'success',
                    'position': 'top-center',
                    'dangerouslyHTMLString': true
                })
            }
        },
          
        increase(id){
            // console.log('increase',id)
            const prod = this.cart.find(elem=> elem.id==id)
            if(prod!=undefined&&prod.amount<=20){
                prod.amount++
            }
        },

        decrease(id){
            const prod = this.cart.find(elem=> elem.id==id)
            if(prod!=undefined){
              if(prod.amount>0){
                  prod.amount-=1
                  if(prod.amount==0){
                      this.cart = this.cart.filter( elem=> elem.id!=id)
                  }
              }
            }
        },

        removeItem(id){
            this.cart = this.cart.filter(elem=>elem.id!=id)
        },

        setData(data){
            this.products=data.products
            this.categories=data.categories
        },

        disposeProduct(){
            this.productSelected=null
        },

        setProduct(product){
            this.productSelected=product
        },

        async send(data){
            const uri = `${useRuntimeConfig().public.base_api}order/new/${useRuntimeConfig().public.token}`

            await $fetch(uri,{
                method: 'POST',
                body:  JSON.stringify(data)
            }).catch( (error)=> error.data )

            useNuxtApp().$toast('Enviado con exito 🎉 Pronto nos comunicaremos contigo', {
                'theme': 'dark',
                'type': 'success',
                'autoClose': 5000,
                'position': 'top-center',
                'dangerouslyHTMLString': true
            })
        },

        setCat(category){
            this.catSelected.id = category.id,
            this.catSelected.name = category.name
        },

        resetCatSelected(){
             this.catSelected.id = 0
             this.catSelected.name = 'Menú'
        },

        cartShowing(value){
            this.showCart = value
        },

        async sendOrderCart(data){
            const uri = `${ import.meta.env.VITE_BASE_API }sales/${ import.meta.env.VITE_TOKEN}`
            data.cart = this.cart

            try {
                await axios.post(uri, data)
                this.cart=[]
            } catch (error) {
                console.log(error)
            }
        }
        
    }
})