import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Dashboard',
    component: () => import ('../pages/Dashboard.vue')
  },
  {
    path: '/folder/:id',
    component: () => import ('../pages/FolderPage.vue')
  },
  {
    path: '/manageshop',
    component: () => import ('../pages/ManageShop.vue')
  },
  {
    path: '/registeremployee',
    component: () => import ('../pages/RegisterEmployee.vue')
  },
  {
    path: '/order',
    component: () => import ('../pages/ManageOrder.vue')
  },
  {
    path: '/folder/OrderInPlace',
    component: () => import ('../pages/OrderChooseTables.vue')
  },
  {
    path: '/ordertakeaway',
    component: () => import ('../pages/OrderChooseDishes.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
