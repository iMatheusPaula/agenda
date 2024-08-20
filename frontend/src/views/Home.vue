<script setup>
import apiClient from '@/services/apiClient.js';
import {onMounted, reactive} from "vue";
import ContactCard from "@/components/ContactCard.vue";
import {useToast} from "vue-toastification";

const toast = useToast();
const state = reactive({
  contacts: [],
  isLoading: false
});

async function showContacts(){
  state.isLoading = true;
  await apiClient.get('/api/contact/index').then((response) => {
    state.contacts = response.data;
  }).catch((error) => {
    toast.error("Erro ao carregar os contatos.");
  })
  state.isLoading = false;
}

onMounted(showContacts);
</script>

<template>
  <RouterLink to="/addContact">Adicionar contato</RouterLink>

  <div v-if="state.isLoading">Carregando...</div>

  <div v-else>
    <div v-if="state.contacts.length === 0">Nenhum contato encontrado.</div>
    <div v-else>
      <h1>Contatos:</h1>
      <ContactCard
          v-for="contact in state.contacts"
          :key="contact.id"
          :contact="contact"
      />
    </div>
  </div>
</template>
