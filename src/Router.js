import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import {createMemoryHistory, createRouter} from "vue-router";
import Browse from "./views/Browse.vue";

const routes = [
    { path: '/', name: 'home', component: Home, alias: '/home', },
    { path: '/browse', name: 'browse', component: Browse, },
    { path: '/user', name: 'profile', component: Profile, },
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
