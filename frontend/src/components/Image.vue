<script setup>
import {ref} from "vue";

const props = defineProps({
  image: String,
  name: String,
  classImg: String,
})
const nameFirst = ref(props.name[0] ? "" : "");
const img = ref(`http://192.168.1.9:8000/storage/${props.image}`)
</script>
<template>
  <img :src="img" alt="" class="rounded-full" v-if="image" />
  <div v-else class="bg-black text-white text-center text-xl rounded-full w-full h-full">{{ nameFirst }}</div>
</template>
