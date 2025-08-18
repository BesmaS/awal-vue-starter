import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import router from './router'

// ✨ Import de AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

// ✅ Initialise AOS ici
AOS.init({
  duration: 800,
  once: false, // si tu veux que l’anim se joue à chaque scroll
  easing: 'ease-out',
})

app.mount('#app')
