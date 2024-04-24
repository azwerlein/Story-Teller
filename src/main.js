import { createApp } from 'vue'
import './css/main.css'
import App from './App.vue'
import {router} from "./js/router.js";

createApp(App)
    .use(router)
    .mount('#app')
