// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Public from '../views/Public.vue'
import Login from '../views/Login.vue'
import Admin from '../components/Admin.vue'


const routes = [
  { path: '/', component: Public },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router // ✅ OBLIGATOIRE à la fin
