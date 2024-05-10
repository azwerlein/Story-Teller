<script setup>
import {computed, ref} from "vue";
import {signOut} from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';

import {auth, db} from "./js/firebase.js";

import {UserSession} from "./models/User.js";


const authUser = ref(0);
auth.onAuthStateChanged(user => {
  if (user) {
    const docRef = doc(db, 'users', user.uid);
    getDoc(docRef)
        .then(snapshot => {
          authUser.value = new UserSession(user, snapshot.data());
        })
        .catch(error => {
          console.log('Error: ', error.code, error.data);
        });
  } else {
    authUser.value = null;
  }
});

function logout() {
  signOut(auth);
}

const loggedIn = computed(() => {
  return authUser.value?.profile;
});
</script>

<template>
  <header class="bg-primary flex justify-between text-slate-50 p-4">
    <div class="flex-auto flex justify-around">
      <h1 class="font-bold text-xl">
        <RouterLink :to="{name: 'home'}">Story Teller</RouterLink>
      </h1>
      <h2>
        <RouterLink :to="{name: 'browse'}">Browse</RouterLink>
      </h2>
      <h2>
        <RouterLink :to="{name: 'community'}">Community</RouterLink>
      </h2>
    </div>
    <div v-if="loggedIn">
      <div class="flex-auto flex justify-end">
        <button class="btn">Notifications</button>
        <div class="dropdown dropdown-end">
          <img tabindex="0" role="button" class="rounded-full border-4 border-slate-400 h-20"
               :src="authUser.profile?.photoURL"
               alt="Profile">
          <ul tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-secondary border-4 border-slate-400 rounded-box p-2 w-40">
            <li>
              <RouterLink :to="{name: 'profile', params: {id: authUser.user.uid}}">Profile</RouterLink>
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

  <main>
    <RouterView :auth-user="authUser"></RouterView>
  </main>

</template>

<style scoped>

</style>
