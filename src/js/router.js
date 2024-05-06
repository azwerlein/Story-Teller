import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Browse from "../views/Browse.vue";
import Login from "../views/Login.vue";
import AccountCreation from "../views/AccountCreation.vue";
import StoryEditor from "../views/StoryEditor.vue";
import CharacterEditor from "../views/CharacterEditor.vue";

const routes = [
    { path: '/', name: 'home', component: Home, alias: '/home' },
    { path: '/browse', name: 'browse', component: Browse },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: AccountCreation },
    {path: '/browse', name: 'browse', component: Browse },
    {path: '/user', name: 'profile', component: Profile },
    {
        path: '/story', children: [
            {path: '', name: 'storyeditor', component: StoryEditor,},
            {path: 'character/:id', name: 'charactereditor', component: CharacterEditor,},
        ]
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
