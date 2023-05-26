import { createRouter, createWebHistory } from 'vue-router'

const rootRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/RootLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/root/HomePage.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/root/AboutPage.vue'),
      },
    ],
  },
]

const routes = [...rootRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
