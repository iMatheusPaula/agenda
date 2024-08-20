<script setup>
import {reactive} from "vue";
import apiClient from "@/services/apiClient.js";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const router = useRouter();
const toast = useToast();
const state = reactive({
  name: '',
  email: '',
  phone: ''
})
async function addContact(){
  await apiClient.post('/api/contact/store', {
    name: state.name,
    email: state.email,
    phone: state.phone,
  }).then(() => {
    toast.success(`${state.name} foi criado com sucesso.`);
    router.push({ name: 'Home' });
  })
      .catch((error) => {
    if(error.response.status === 422) toast.error("Informe os dados corretamente.");
    else toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
  })
}
</script>

<template>
  <div class="items-center flex flex-col p-6">
    <h1>Adicionar contato</h1>
    <div class="">
      <form @submit.prevent="addContact" class="flex flex-col p-4">
        <input id="name" v-model="state.name" type="text" placeholder="Nome" />
        <input id="phone" v-model="state.phone" type="text" placeholder="Telefone" />
        <input id="email" v-model="state.email" type="text" placeholder="E-mail" />
        <input id="image" type="file" placeholder="Foto" />
        <button id="submit-btn" type="submit">Cadastrar</button>
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