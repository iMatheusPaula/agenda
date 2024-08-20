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
  <div class="items-center flex flex-col p-6">
    <h1>Editar {{ state.contact.name }}</h1>
    <div class="">
      <form @submit.prevent="updateContact" class="flex flex-col p-4">
        <input id="name" v-model="state.contact.name" type="text" placeholder="Nome" />
        <input id="phone" v-model="state.contact.phone" type="text" placeholder="Telefone" />
        <input id="email" v-model="state.contact.email" type="text" placeholder="E-mail" />
        <input id="image" type="file" placeholder="Foto" />
        <button id="submit-btn" type="submit">Editar</button>
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