<script setup>
import { useMenu } from '../../composables/useMenu'

const { categories, setCat, resetCatSelected } = useMenu()

const setCategory =(cat)=>{
    document.getElementById('menu').scrollIntoView()
    setCat(cat)
}

</script>
<template>
  <div class="nav-stick">
    <nav>
        <ul class="flex">
            <li>
                <a class="nav-action" @click="resetCatSelected">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" width="40" height="40"><title>apps</title><path d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z" /></svg>
                </a>
            </li>
            <li>
                <a href="#promos">
                    Promos                    
                </a>
            </li>
            <li v-for="cat in categories" :key="cat.id">
                <a class="nav-action" @click="setCategory(cat)">
                    {{ cat.name }}
                </a>
            </li>
        </ul>
    </nav>
  </div>
</template>