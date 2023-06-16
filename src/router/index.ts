import { createRouter, createWebHistory } from 'vue-router'

const rootRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/RootLayout.vue'),
    redirect: { name: 'root.stocks' },
    children: [
      {
        path: 'auth',
        name: 'root.auth',
        component: () => import('@/pages/root/AuthPage.vue'),
      },
      {
        path: 'stocks',
        name: 'root.stocks',
        component: () => import('@/pages/root/StocksPage.vue'),
      },
      {
        path: 'advices',
        name: 'root.advices',
        component: () => import('@/pages/root/AdvicesPage.vue'),
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
