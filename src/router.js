import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './components/LoginPage.vue'
import WelcomePage from './components/WelcomePage.vue'
import OrderPage from './components/OrderPage.vue'
import TablesPage from './components/TablesPage.vue'
import NewTablePage from './components/NewTablePage.vue'
import PaymentPage from './components/PaymentPage.vue'

const routes = [
    { path: '/', component: LoginPage },
    { path: '/welcome', component: WelcomePage },
    { path: '/order', component: OrderPage },
    { path: '/tables', component: TablesPage },
    { path: '/new-table', component: NewTablePage },
    { path: '/add-order/:tableId', name: 'add-order', component: () => import('./components/AddOrderPage.vue'), props: true },
    { path: '/payment', component: PaymentPage },
    { path: '/payment/:tableId', name: 'PaymentDetail', component: () => import('./components/PaymentDetailPage.vue'), props: true },
    { path: '/menu-edit', component: () => import('./components/MenuEditPage.vue') },
    { path: '/:catchAll(.*)', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
