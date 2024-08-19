<script setup lang="ts">
import {useRoute} from "vue-router";
import apiClient from "@/services/apiClient";
import {onMounted, reactive} from "vue";

const route = useRoute();

const state = reactive({
  contact: {},
  isLoading: false,
})

async function getUser() {
  state.isLoading = true;
  await apiClient.get(`/api/contact/show/${route.params.id}`).then((response) => {
    state.contact = response.data;
  });
  state.isLoading = false;
}
onMounted(getUser);
</script>

<template>
  <div class="" v-if="!state.isLoading">
    <div class="border-solid border-gray-200 border-2 p-2 justify-between flex w-1/2 m-3">
      <div>
        <h1>{{ state.contact.name }}</h1>
        <p>{{ state.contact.phone }}</p>
        <p>{{ state.contact.email }}</p>
      </div>
      <div class="flex-col flex">
        <span class="cursor-pointer">Editar</span>
        <span class="cursor-pointer">Deletar</span>
      </div>
    </div>
  </div>
  <div v-if="state.isLoading">
    Carregando..
  </div>
</template>
