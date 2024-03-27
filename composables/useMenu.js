import { computed } from "vue"
import { useMenuStore } from "@/store/menuStore"

export const useMenu = ()=>{

    const storeMenu = useMenuStore()

    const retrieveProducts = async(products)=>{
        await storeMenu.retrieveProducts(products)
    }

    const addToCart= (amount)=>{
        storeMenu.addToCart(amount)
    }

    const removeItem = (id)=>{
        storeMenu.removeItem(id)
    }

    const updateOrder = ()=>{
        storeMenu.updateOrder()
    }

    const setScrollbg=(data)=>{
        storeMenu.setScrollbg(data)
    }

    const increase=(id)=>{
        storeMenu.increase(id)
    }

    const decrease=(id)=>{
        storeMenu.decrease(id)
    }

    const remove=(id)=>{
        storeMenu.remove(id)
    }

    const setData=(data)=>{
        storeMenu.setData(data)
    }

    const disposeProduct=()=>{
        storeMenu.disposeProduct()
    }

    const setProduct=(product)=>{
        storeMenu.setProduct(product)
    }

    const send=async(data)=>{
        await storeMenu.send(data)
    }

    const setCat = (category)=>{
        storeMenu.setCat(category)
    }

    const resetCatSelected = ()=>{
        storeMenu.resetCatSelected()
    }

    const cartShowing=(value) =>{
        storeMenu.cartShowing(value)
    }

    const sendOrderCart =async(data)=>{
        await storeMenu.sendOrderCart(data)
    }

    return{
        products: computed( ()=> storeMenu.getProducts ),
        cart: computed( ()=> storeMenu.getCart ),
        scrollbg: computed( ()=> storeMenu.getScrollBg ),
        featured: computed( ()=> storeMenu.getFeatured ),
        categories: computed( ()=> storeMenu.getCategories ),
        total: computed( ()=> storeMenu.getTotal ),
        totalItems: computed( ()=> storeMenu.getTotalItems ),
        isProductSelected: computed( ()=> storeMenu.isProductSelected ),
        productSelected: computed( ()=> storeMenu.getProductSelected ),
        info: computed( ()=> storeMenu.getInfo ),
        catSelected: computed( ()=> storeMenu.getCatSelected ),
        productsByCat: computed( ()=> storeMenu.getProductsByCat ),
        isCartVisible: computed( ()=> storeMenu.isCartVisible ),
        totalCartItems: computed( ()=> storeMenu.totalCartItems ),
        
        retrieveProducts,
        addToCart,
        removeItem, 
        updateOrder,
        setScrollbg,
        increase,
        decrease,
        remove,
        setData,
        disposeProduct,
        setProduct,
        send,
        setCat,
        resetCatSelected,
        cartShowing,
        sendOrderCart
    }

}