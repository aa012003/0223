import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/front/CartView.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/front/ProductsView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/front/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'order',
        component: () => import('../views/dashboard/OrderView.vue'),
      },
      {
        path: 'product',
        component: () => import('../views/dashboard/ProductView.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/dashboard/LoginView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
