<script setup>
import {reactive} from "vue";
import {usePiniaStore} from "@/stores/usePiniaStore";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const router = useRouter();
const toast = useToast();
const auth = usePiniaStore();
const state = reactive({
  email: '',
  password: '',
});

async function loginHandler(){
  await auth.login({
    email: state.email,
    password: state.password,
  }).then(() => {
    router.push({ name: 'Home' });
  }).catch((error) => {
    if(error.response.status === 422) toast.error("Informe um e-mail e senha válidos.");
    else if(error.response.status === 401) toast.error("E-mail ou senha incorretos. Tente novamente.");
    else toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
  });
}
</script>
<template>
  <div class="items-center flex flex-col p-6">
    <h1>Bem vindo a agenda</h1>
    <h2>Entre para começar a usar</h2>
    <div class="">
      <form @submit.prevent="loginHandler" class="flex flex-col p-4">
        <input id="email" v-model="state.email" type="text" placeholder="Email" />
        <input id="password" v-model="state.password" type="password" placeholder="Password" />
        <button id="submit-btn" type="submit">Entrar</button>
        <span class="text-gray-800">Não tem uma conta? <RouterLink to="/register">Cadastre-se aqui!</RouterLink></span>
      </form>
    </div>
  </div>
</template>
<style scoped>
form input {
  @apply p-2 bg-gray-100 rounded-xl m-2
}
form button{
  @apply p-2 bg-blue-200 rounded-xl m-2 hover:bg-blue-400
}
</style>
