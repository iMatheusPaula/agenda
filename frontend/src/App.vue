<script setup>
import Footer from "@/components/Footer.vue";
import {usePiniaStore} from "@/stores/usePiniaStore";
import {useToast} from "vue-toastification";
import {useRouter} from "vue-router";

const toast = useToast();
const router = useRouter();
const auth = usePiniaStore();

async function logoutHandler() {
  await auth.logout().then(() => {
    router.push({name: 'Login'});
    toast.success("Desconectado.");
  });
}
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
          @click="logoutHandler()">Sair</span>
    </div>
  </header>
  <RouterView />
  <Footer />
</template>
