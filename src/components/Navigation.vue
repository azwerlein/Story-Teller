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
  <header
      class="bg-primary flex justify-between md:justify-end content-center items-center gap-x-20 p-4 border-b-2 border-neutral sm:gap-x-10">
    <div class="dropdown block md:hidden">
      <i class="fa-solid fa-bars text-[2em]"
         role="button"
         tabIndex="1"
      ></i>
      <ul tabindex="1"
          class="dropdown-content z-[1] menu shadow bg-neutral border-4 border-slate-400 rounded-box p-2 w-40">
        <li>
          <RouterLink :to="{name: 'home'}">Story Teller</RouterLink>
        </li>
        <li>
          <RouterLink :to="{name: 'community'}">Community</RouterLink>
        </li>
      </ul>
    </div>

    <h2 class="hidden md:inline-block">
      <RouterLink :to="{name: 'home'}">Story Teller</RouterLink>
    </h2>
    <h2 class="hidden md:inline-block">
      <RouterLink :to="{name: 'community'}">Community</RouterLink>
    </h2>

    <div v-if="store.userSession?.profile">
      <div class="flex-auto flex justify-end">
        <div class="dropdown dropdown-end">
          <div class="flex justify-center rounded-full border-4 border-neutral-content w-16 h-16 bg-base-100
          transition-all ease-out duration-300 active:scale-110"
               tabindex="0"
               role="button">
            <img v-if="store.userSession.profile?.photoURL"
                 tabindex="0" role="button"
                 :src="store.userSession.profile.photoURL"
                 alt="Profile"
                 class="rounded-full">
            <i v-else class="fa-regular fa-user m-auto"></i>
          </div>
          <ul tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-neutral border-4 border-slate-400 rounded-box p-2 w-40">
            <li>
              <RouterLink :to="{name: 'profile', params: {id: store.userSession?.profile.uid ?? ''}}">Profile</RouterLink>
            </li>
            <li><a v-on:click="logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <RouterLink :to="{name: 'login'}" class="btn btn-neutral">Login</RouterLink>
    </div>
  </header>
</template>

<style scoped>

</style>