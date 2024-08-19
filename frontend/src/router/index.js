import { createRouter, createWebHistory } from 'vue-router'
import {usePiniaStore} from "@/stores/usePiniaStore";

import LoginView from "@/views/LoginView.vue";
import Home from "@/views/Home.vue";
import addContact from "@/views/AddContact.vue";

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
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
        component: LoginView,
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
