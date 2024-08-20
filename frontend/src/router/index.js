import { createRouter, createWebHistory } from 'vue-router';
import {usePiniaStore} from "@/stores/usePiniaStore";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/addContact',
        name: 'addContact',
        component: () => import('@/views/ContactAddView.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/contactPage/:id',
        name: 'ContactPage',
        component: () => import('@/views/ContactPageView.vue'),
        meta: {
            auth: true
        },
    },
    {
        path: '/contact/destroy/:id/:name',
        name: 'ContactDestroy',
        component: () => import('@/views/ContactDestroyView.vue'),
        meta: {
            auth: true
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
        meta: {
            auth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue'),
        meta: {
            auth: false
        }
    },

]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    const pinia = usePiniaStore();
    if(to.meta.auth){
        if(!pinia.isLoggedIn) next({name: 'Login'});
        else next();
    }
    else if(!to.meta.auth) {
        if(pinia.isLoggedIn) next({name: 'Home'});
        else next();
    }
})

export default router
