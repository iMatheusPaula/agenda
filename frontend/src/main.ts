import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
const app = createApp(App);

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app');
