import {readonly, reactive, ref, computed} from "vue"
import apiClient from "@/services/apiClient";

type User = {
    id: number,
    name: string,
    email: string
}

const userInitialState = {
    currentUser: {},
    isLoggedIn: false
}

let state = reactive({
    ...userInitialState,
    isLoggedIn: computed(() => !!state.currentUser.value),
})

function resetUserStore(){
    state = reactive(userInitialState)
}

function clearUser(){
    state.currentUser = null
}

function setCurrentUser(user: User){
    state.currentUser = user
}

async function getUser(){
    // apiClient request for /api/users and return User
    await apiClient.get('/api/user').then((response: any) => {
        setCurrentUser(response.data);
    })
}

export default {
    state,
    userInitialState,
    resetUserStore,
    clearUser,
    setCurrentUser,
    getUser
};
