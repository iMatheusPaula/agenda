<script setup>
import {reactive} from "vue";
import {usePiniaStore} from "@/stores/usePiniaStore";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const router = useRouter();
const toast = useToast();
const auth = usePiniaStore();
const state = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

async function registerHandler(){
  await auth.register({
    name: state.name,
    email: state.email,
    password: state.password,
    password_confirmation: state.password_confirmation,
  }).then((response) => {
    toast.success("Usuário criado com sucesso. Faça Login.");
    setTimeout(() => {
      router.push({ name: 'Login' });
    },5000);
  }).catch((error) => {
    if(error.response.status === 422) toast.error("Informe os dados corretamente.");
    else toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
  });
}
</script>
<template>
  <div class="items-center flex flex-col p-6">
    <h1>Cadastre-se para começar a usar a agenda.</h1>
    <div class="">
      <form @submit.prevent="registerHandler" class="flex flex-col p-4">
        <input id="name" v-model="state.name" type="text" placeholder="Nome" />
        <input id="email" v-model="state.email" type="text" placeholder="E-mail" />
        <input id="password" v-model="state.password" type="password" placeholder="Senha" />
        <input id="password_confirmation" v-model="state.password_confirmation" type="password" placeholder="Confirmação de Senha" />
        <button id="submit-btn" type="submit">Cadastrar</button>
        <span class="text-gray-800">Já tem uma conta? <RouterLink to="/login">Faça login aqui!</RouterLink></span>
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
