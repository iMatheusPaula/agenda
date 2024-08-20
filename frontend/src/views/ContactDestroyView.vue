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
  <div class="items-center flex flex-col p-6">
    <h1>Tem certeza que deseja deletar <span class="font-bold">{{ route.params.name }}</span>?</h1>
    <button @click="handleDestroy">Sim</button>
    <button @click="router.back()">Cancelar</button>
  </div>
</template>
