import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const addLayout = (route: RouteRecordRaw): RouteRecordRaw => {
  const result = { ...route };

  if (route.component) {
    result.components = {
      default: route.component,
      leftSidebar: () => import('@/features/LeftSidebar.vue'),
      rightSidebar: () => import('@/features/RightSidebar.vue'),
    };
    delete result.component;
  }
  if (route.components) {
    result.components = {
      ...result.components,
      leftSidebar: () => import('@/features/LeftSidebar.vue'),
      rightSidebar: () => import('@/features/RightSidebar.vue'),
    };
  }

  return result;
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    addLayout({
      path: '/',
      name: 'home',
      component: () => import('@/views/DashboardView.vue'),
    }),
    addLayout({
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    }),
    addLayout({
      path: '/users',
      name: 'users',
      component: () => import('@/views/Users/Users.vue'),
    }),
  ],
});

export default router;
