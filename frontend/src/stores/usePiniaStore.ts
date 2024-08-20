import {readonly, reactive, ref, computed} from "vue"
import apiClient from "@/services/apiClient";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import useUserStore from "@/stores/useUserStore";
import {useToast} from "vue-toastification";

type User = {
    id: number,
    name: string,
    email: string
}

type Credentials = {
    email: string,
    password: string
}

type Register = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

const toast = useToast();
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
        await getUser();
    }
    const register = async function (credentials: Register) {
        await apiClient.get('/sanctum/csrf-cookie');
        await apiClient.post('/api/register', credentials);
    }
    const logout = async function () {
        await apiClient.post('/api/logout');
        user.value = null;
    }
    return { user, isLoggedIn, getUser, login, register, logout }
}, {persist: true});
