import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Inbox'
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
    path: '/order',
    component: () => import ('../pages/ManageOrder.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
