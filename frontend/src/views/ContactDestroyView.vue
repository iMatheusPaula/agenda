<script setup>
import {useRoute, useRouter} from "vue-router";
import apiClient from "@/services/apiClient";
import {useToast} from "vue-toastification";

const route = useRoute();
const router = useRouter();
const toast = useToast();

async function handleDestroy(){
  console.log("id param: ",route.params.id);
  await apiClient.delete(`/api/contact/destroy/${route.params.id}`).then((response) => {
    toast.success("Contato deletado com sucesso.");
    router.push({ name: 'Home' });
  }).catch(() => {
    toast.error("Falha ao deletar o contato.");
  })
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-2xl w-96 lg:w-1/3 justify-center px-6 py-20 lg:px-8">
    <h1 class="text-gray-900 tracking-tight font-bold text-2xl text-center mb-3">Tem certeza que deseja deletar <span class="font-bold">{{ route.params.name }}</span>?</h1>
    <div class="flex flex-col p-2">
      <button class="btn" @click="handleDestroy">Deletar</button>
      <button class="btn" @click="router.back()">Cancelar</button>
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
