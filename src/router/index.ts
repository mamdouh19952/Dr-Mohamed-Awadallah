import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home/index.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: () => import('@/pages/About/index.vue') },
    { path: '/services', name: 'services', component: () => import('@/pages/Services/index.vue') },
    { path: '/reviews', name: 'reviews', component: () => import('@/pages/Reviews/index.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact/index.vue') },
    { path: '/cases', name: 'cases', component: () => import('@/pages/Cases/index.vue') },
    { path: '/cases/:id', name: 'case-detail', component: () => import('@/pages/Cases/Detail.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'smooth' }
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
