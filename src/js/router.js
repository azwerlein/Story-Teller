import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Browse from "../views/Browse.vue";
import Community from "../views/Community.vue";
import Login from "../views/Login.vue";
import AccountCreation from "../views/AccountCreation.vue";
import StoryEditor from "../views/StoryEditor.vue";
import CharacterEditor from "../views/CharacterEditor.vue";

import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/', name: 'home', component: Home, alias: '/home' },
    { path: '/browse', name: 'browse', component: Browse },
    { path: '/community', name: 'community', component: Community },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: AccountCreation },
    { path: '/user/:id', name: 'profile', component: Profile, props: true },
    {
        path: '/story/:id', children: [
            { path: '', name: 'storyeditor', component: StoryEditor },
            { path: 'character/:id', name: 'charactereditor', component: CharacterEditor },
        ]
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
