<script setup>
import {signOut} from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';

import {auth} from "./js/firebase.js";

import {UserSession} from "./models/User.js";
import {useSessionStore} from "./js/store.js";
import {onMounted} from "vue";

const store = useSessionStore();

function logout() {
  signOut(auth);
}

onMounted(() => {
  store.init();
});

</script>

<template>
  <header class="bg-base-300 flex justify-between p-4 h-32 border-b-2 border-neutral">
    <div class="flex-auto flex justify-around">
      <h1 class="text-4xl">
        <RouterLink :to="{name: 'home'}">Story Teller</RouterLink>
      </h1>
      <h2 class="text-2xl">
        <RouterLink :to="{name: 'community'}">Community</RouterLink>
      </h2>
    </div>
    <div v-if="store.userSession?.profile">
      <div class="flex-auto flex justify-around">
        <button class="btn">Notifications</button>
        <div class="dropdown dropdown-end">
          <img tabindex="0" role="button" class="rounded-full border-4 border-neutral-content h-16"
               :src="store.userSession.profile?.photoURL"
               alt="Profile">
          <ul tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-neutral border-4 border-slate-400 rounded-box p-2 w-40">
            <li>
              <RouterLink :to="{name: 'profile', params: {id: store.userSession.user.uid}}">Profile</RouterLink>
            </li>
            <li><a>Settings</a></li>
            <li><a v-on:click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <RouterLink :to="{name: 'login'}" class="btn">Login</RouterLink>
    </div>
  </header>

  <main class="bg-base-100">
    <RouterView></RouterView>
  </main>

  <footer class="flex justify-center w-full p-20 bg-neutral/50 border-t-2 border-neutral">
    <p>&copy; 2024 Cactus corp.</p>
  </footer>

</template>

<style scoped>

</style>
