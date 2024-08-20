import { createRouter, createWebHistory } from 'vue-router';
import {usePiniaStore} from "@/stores/usePiniaStore";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/addContact',
        name: 'addContact',
        component: () => import('@/views/AddContact.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/contactPage/:id',
        name: 'ContactPage',
        component: () => import('@/views/ContactPage.vue'),
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
