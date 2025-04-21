import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Dashboard from '../components/Dashboard.vue'; // Corrected file path
import Login from '../components/Login.vue'; // Corrected file path

const routes = [
  {
    path: '/', // Route for home
    name: 'home',
    component: HomeView,
  },
  {
    path: '/dashboard', // Unique path for Dashboard
    name: 'Dashboard',
    component: Dashboard,
  },
  {
  path: '/login', // Unique path for Login
  name: 'Login',
  component: Login,
  },
  {
    path: '/about',
    name: 'about',
    // Route level code-splitting
    // Generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
