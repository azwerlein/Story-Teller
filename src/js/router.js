import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Browse from "../views/Browse.vue";
import Login from "../views/Login.vue";
import AccountCreation from "../views/AccountCreation.vue";

const routes = [
    { path: '/', name: 'home', component: Home, alias: '/home', },
    { path: '/browse', name: 'browse', component: Browse, },
    { path: '/user', name: 'profile', component: Profile, },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: AccountCreation },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
