<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import {usePiniaStore} from "@/stores/usePiniaStore";
const auth = usePiniaStore();
</script>
<template>
  <header class="bg-blue-100 p-5 w-full flex justify-between">
    <div>
      <RouterLink to="/">Agenda :)</RouterLink>
    </div>
    <div v-if="auth.isLoggedIn">
      Olá, {{ auth.user?.name }}
      <span
          class="bg-gray-400 rounded-full p-2 cursor-pointer hover:bg-gray-600"
          @click="auth.logout()">Sair</span>
    </div>
  </header>
  <RouterView />
  <Footer />
</template>
