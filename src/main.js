import './assets/css/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueReCaptcha } from 'vue-recaptcha-v3'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
// const app = createApp(App).mount('#app')

app.use(VueReCaptcha, {
    siteKey: import.meta.env.VITE_RECAPTCHA
})

app.use(pinia)
app.mount('#app')