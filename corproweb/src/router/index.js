import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }, // Ensure the route is accessible to authenticated users only
    },
    // ... other routes
];

const router = new VueRouter({
    routes,
});

export default router;