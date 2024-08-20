<script setup>
import {useRouter} from "vue-router";
import Image from "@/components/Image.vue";

const router = useRouter();
const props = defineProps({
  contact: {type: Object, required: true}
});

function goToContactPage() {
  router.push({ name: 'ContactPage', params: { id: props.contact.id }})
}
</script>

<template>
  <div class="lg:w-1/2">
    <div class="gap-x-4 flex justify-self-auto bg-white rounded-xl shadow-sm p-5 m-3 cursor-pointer hover:bg-gray-100"
         @click="goToContactPage"
    >
      <Image :image="contact.image" :name="contact.name" class="h-12 w-12" />
      <div class="min-w-0 flex-auto">
        <h3 class="font-semibold text-gray-900">{{ contact.name }}</h3>
        <p class="text-sm font-semibold text-gray-600">{{ contact.phone }}</p>
        <p>{{ contact.email }}</p>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>