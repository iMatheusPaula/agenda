<script setup lang="ts">
import apiClient from "@/services/apiClient";
import {reactive} from "vue";
import useUserStore from "@/stores/useUserStore";
const state = reactive({
  email: '',
  password: '',
});
async function loginHandler(){
  await apiClient.get('/sanctum/csrf-cookie');
  await apiClient.post('/api/login', {
    email: state.email,
    password: state.password,
  }).then((response) => {
    console.log(response);
  }).catch((error) => {
    console.log(error);
  });
  useUserStore.getUser();
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="loginHandler">
    <input id="email" v-model="state.email" type="text" placeholder="Email" />
    <input id="password" v-model="state.password" type="password" placeholder="Password" />
    <button id="submit-btn" type="submit">Submit</button>
  </form>
</template>

<style scoped>

</style>