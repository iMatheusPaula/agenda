<script setup lang="ts">
import useUserStore from "@/stores/useUserStore";
import {usePiniaStore} from "@/stores/usePiniaStore";
import {computed, onMounted} from "vue";

const pinia = usePiniaStore();
onMounted(() => {
  pinia.getUser();
})
</script>

<template>
Bem-Vindo {{ pinia.user?.name }}
</template>
