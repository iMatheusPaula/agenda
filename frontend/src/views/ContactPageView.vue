<script setup>
import {useRoute, useRouter} from "vue-router";
import apiClient from "@/services/apiClient";
import {onMounted, reactive, ref} from "vue";
import {useToast} from "vue-toastification";
import Image from "@/components/Image.vue";

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
  <div v-else class="bg-white rounded-2xl shadow-2xl w-96 lg:w-1/3 justify-center px-6 py-20 lg:px-8">
    <button class="btn" @click="router.back()">Voltar</button>
    <div class="flex flex-col p-2 items-center justify-center gap-7">
      <Image :image="kkk" :name="Maath" class="h-12 w-12" />
      <h1 class="text-gray-900 tracking-tight font-bold text-2xl text-center mb-3">{{ state.contact.name }}</h1>
    </div>
    <div class="flex flex-col p-2">
      <span class="infos">Celular: {{ state.contact.phone }}</span>
      <span class="infos">E-mail: {{ state.contact.email }}</span>
      <button class="btn" @click="btnUpdateHandler">Editar</button>
      <button class="btn" @click="bntDeleteHandler">Deletar</button>
    </div>
  </div>

</template>
<style scoped>
.infos {
  @apply p-2 m-2 border-0
  text-gray-900 placeholder:text-gray-500 sm:text-sm sm:leading-6
}
.btn{
  @apply p-2 bg-blue-600 rounded-md mx-2 mt-4 mb-7 hover:bg-blue-500 leading-6 shadow-inner text-white transition duration-200
}
</style>