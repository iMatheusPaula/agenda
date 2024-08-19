<script setup lang="ts">
import apiClient from '@/services/apiClient.js';
import {onMounted, reactive} from "vue";
import ContactCard from "@/components/ContactCard.vue";
const state = reactive({
  contacts: []
});

function showContacts(){
  apiClient.get('/api/contact/index').then((response) => {
    state.contacts = response.data;
    console.log(state.contacts)
  })
}

onMounted(showContacts);
</script>

<template>
  <RouterLink to="/addContact">Adicionar contato</RouterLink>
  <h1>Contatos:</h1>
  <ContactCard
      v-for="contact in state.contacts"
      :key="contact.id"
      :contact="contact"
  />
</template>
