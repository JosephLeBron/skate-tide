import { createRouter, createWebHistory } from 'vue-router'
import Map from '../components/Map.vue'
import LoginView from '@/views/LoginView.vue'
import EventView from '@/views/EventView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Map
    },
    {
      path: '/events',
      name: 'events',
      component: EventView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
