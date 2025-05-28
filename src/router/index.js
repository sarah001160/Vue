import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, // 靜態寫法
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'), // 動態寫法
    },
    {
      path: '/seeabout',
      name: 'seeabout',
      component: () => import('../components/SeeAbout.vue'), // 動態寫法
    },
    {
      path: '/box',
      name: 'box',
      component: () => import('../views/BoxView.vue'), // 動態寫法
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('../views/WatchView.vue'), // 動態寫法
    },
    {
      path: '/slot',
      name: 'slot',
      component: () => import('../views/SlotView.vue'), // 動態寫法
    },
  ],
})

export default router
