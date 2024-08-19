import {readonly, reactive, ref, computed} from "vue"
import apiClient from "@/services/apiClient";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import useUserStore from "@/stores/useUserStore";

type User = {
    id: number,
    name: string,
    email: string
}

type Credentials = {
    email: string,
    password: string
}

const router = useRouter();

export const usePiniaStore = defineStore('pinia', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => !!user.value);
    const getUser = async function () {
        await apiClient.get('/api/user').then((response: any) => {
            user.value = response.data as User;
        })
    }
    const login = async function (credentials: Credentials) {
        await apiClient.get('/sanctum/csrf-cookie');
        await apiClient.post('/api/login', credentials)
            .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        await getUser();
        await router.push({ name: 'Home' });
    }
    const logout = async function () {
        await apiClient.get('/api/logout').then((response: any) => {
            console.log(response)
        }).catch((error: any) => {
            console.log(error)
        });
        user.value = null;
        await router.push({ name: 'Login' });
    }
    return { user, isLoggedIn, getUser, login, logout }
}, {persist: true});
