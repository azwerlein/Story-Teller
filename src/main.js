import { createApp } from 'vue'
import './css/main.css'
import App from './App.vue'
import {router} from "./Router.js";

createApp(App)
    .use(router)
    .mount('#app')
