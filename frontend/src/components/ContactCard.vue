<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps({
  contact: {type: Object, required: true}
});
const router = useRouter();
function goToContactPage()
{
  router.push({ name: 'ContactPage', params: { id: props.contact.id }})
}
</script>

<template>
  <div class="">
    <div class="border-solid border-gray-200 border-2 p-2 justify-between flex w-1/2 m-3 cursor-pointer hover:bg-gray-100"
         @click="goToContactPage"
    >
      <div>
        <h1>{{ contact.name }}</h1>
        <p>{{ contact.phone }}</p>
        <p>{{ contact.email }}</p>
      </div>
      <div class="flex-col flex">
        <img
            width="80"
            class="rounded-full"
            src="https://sampi.net.br/dir-arquivo-imagem/2024/01/652b91ae89e68c67939494ed70d5c4df.jpeg"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>