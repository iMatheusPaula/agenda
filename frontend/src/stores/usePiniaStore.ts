import {readonly, reactive, ref, computed} from "vue"
import apiClient from "@/services/apiClient";
import {defineStore} from "pinia";

type User = {
    id: number,
    name: string,
    email: string
}

export const usePiniaStore = defineStore('pinia', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = computed(() => !!user.value);
    const getUser = async function () {
        await apiClient.get('/api/user').then((response: any) => {
            user.value = response.data as User;
        })
    }
    return { user, isLoggedIn, getUser }
}, {persist: true});
