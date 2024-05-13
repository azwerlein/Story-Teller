<script setup>

import {useSessionStore} from "../js/store.js";
import {signOut} from "firebase/auth";
import {auth} from "../js/firebase.js";

const store = useSessionStore();

function logout() {
  signOut(auth);
}

</script>

<template>
  <header class="bg-base-300 flex justify-between p-4 border-b-2 border-neutral">
    <h1>
      <RouterLink :to="{name: 'home'}">Story Teller</RouterLink>
    </h1>
    <h2>
      <RouterLink :to="{name: 'community'}">Community</RouterLink>
    </h2>
    <div v-if="store.userSession?.profile">
      <div class="flex-auto flex justify-end">
        <button class="btn">Notifications</button>
        <div class="dropdown dropdown-end">
                    <img v-if="store.userSession.profile?.photoURL"
                         tabindex="0" role="button" class="rounded-full border-4 border-neutral-content h-16"
                         :src="store.userSession.profile?.photoURL"
                         alt="Profile">
          <div v-else class="flex justify-center rounded-full border-4 border-neutral-content w-16 h-16" tabindex="0" role="button">
            <i class="fa-regular fa-user m-auto"></i>
          </div>
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
</template>

<style scoped>

</style>