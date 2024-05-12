import { createApp } from 'vue'
import './css/main.css'
import App from './App.vue'
import {router} from "./js/router.js";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
