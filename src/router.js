import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import WelcomePage from './components/WelcomePage.vue'
import OrderPage from './components/OrderPage.vue'
import TablesPage from './components/TablesPage.vue'
import NewTablePage from './components/NewTablePage.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/welcome', component: WelcomePage },
    { path: '/order', component: OrderPage },
    { path: '/tables', component: TablesPage },
    { path: '/new-table', component: NewTablePage },
    { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
