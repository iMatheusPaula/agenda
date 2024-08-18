<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import axios from "axios";
import {reactive} from "vue";

const state = reactive({
  email: '',
  password: '',
});
async function loginHandler(){
  await axios.get('http://localhost:8000/sanctum/csrf-cookie').then((response) => {

    console.log("show"+response);
  });
}
</script>

<template>
  <header class="bg-amber-200 w-full flex justify-between">
  </header>

  <h1>Login</h1>
  <form @submit.prevent="loginHandler">
    <input id="email" v-model="state.email" type="text" placeholder="Email" />
    <input id="password" v-model="state.password" type="password" placeholder="Password" />
    <button id="submit-btn" type="submit">Submit</button>
  </form>
  <Footer />
</template>
