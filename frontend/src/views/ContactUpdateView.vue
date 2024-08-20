<script setup>
import {onMounted, reactive} from "vue";
import apiClient from "@/services/apiClient.js";
import {useToast} from "vue-toastification";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const state = reactive({
  contact: {},
  isLoading: false
})

async function getContact() {
  state.isLoading = true;
  await apiClient.get(`/api/contact/show/${route.params.id}`).then((response) => {
    state.contact = response.data;
  }).catch((error) => {
    toast.error("Falha ao carregar o usuario");
  });
  state.isLoading = false;
}
async function updateContact(){
  await apiClient.put(`/api/contact/update/${route.params.id}`, {
    name: state.contact.name,
    email: state.contact.email,
    phone: state.contact.phone,
  }).then(() => {
    toast.success(`${state.contact.name} foi atualizado com sucesso.`);
    router.back();
  })
      .catch((error) => {
        if(error.response.status === 404) toast.error("Usuário não encontrado.");
        else toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
        console.log(error);
      })
}
onMounted(getContact);
</script>

<template>
  <div class="bg-white rounded-2xl shadow-2xl w-96 lg:w-1/3 justify-center px-6 py-20 lg:px-8">
    <h1 class="text-gray-900 tracking-tight font-bold text-2xl text-center mb-3">Editar {{ state.contact.name }}</h1>
    <form @submit.prevent="updateContact" class="flex flex-col p-2">
      <input id="name" v-model="state.contact.name" type="text" placeholder="Nome" />
      <input id="phone" v-model="state.contact.phone" type="text" placeholder="Telefone" />
      <input id="email" v-model="state.contact.email" type="text" placeholder="E-mail" />
      <input id="image" type="file" placeholder="Foto" />
      <button id="submit-btn" type="submit">Editar</button>
      <button id="submit-btn" type="button" @click="router.back()">Cancelar</button>
    </form>
  </div>
</template>
<style scoped>
form input {
  @apply p-2 bg-gray-100 rounded-md m-2 border-0
  text-gray-900 placeholder:text-gray-500 shadow-inner ring-1 ring-gray-300 sm:text-sm sm:leading-6
}
form button{
  @apply p-2 bg-blue-600 rounded-md mx-2 mt-4 mb-7 hover:bg-blue-500 leading-6 shadow-inner text-white transition duration-200
}
</style>
