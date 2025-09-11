import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import WelcomePage from './components/WelcomePage.vue'
import OrderPage from './components/OrderPage.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/welcome', component: WelcomePage },
    { path: '/order', component: OrderPage },
    { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
