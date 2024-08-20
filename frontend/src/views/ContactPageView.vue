<script setup>
import {useRoute, useRouter} from "vue-router";
import apiClient from "@/services/apiClient";
import {onMounted, reactive} from "vue";
import {useToast} from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const state = reactive({
  contact: {},
  isLoading: false,
});

async function getContact() {
  state.isLoading = true;
  await apiClient.get(`/api/contact/show/${route.params.id}`).then((response) => {
    state.contact = response.data;
  }).catch((error) => {
    toast.error("Falha ao carregar o usuario");
  });
  state.isLoading = false;
}

function bntDeleteHandler(){
  router.push({ name: 'ContactDestroy', params: { id: state.contact.id, name: state.contact.name }})
}
function btnUpdateHandler(){
  router.push({ name: 'ContactUpdate', params: { id: state.contact.id }})
}
onMounted(getContact);
</script>
<template>
  <div v-if="state.isLoading">
    Carregando..
  </div>
  <div v-else>
    <div class="border-solid border-gray-200 border-2 p-2 justify-between flex w-1/2 m-3">
      <div>
        <h1>{{ state.contact.name }}</h1>
        <p>{{ state.contact.phone }}</p>
        <p>{{ state.contact.email }}</p>
      </div>
      <div class="flex-col flex">
        <span class="cursor-pointer" @click="btnUpdateHandler">Editar</span>
        <span class="cursor-pointer" @click="bntDeleteHandler">Deletar</span>
      </div>
    </div>
  </div>
</template>
