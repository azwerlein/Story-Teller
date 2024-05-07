<script setup>
import {computed, ref} from "vue";
import {signOut} from "firebase/auth";
import {doc, getDoc} from 'firebase/firestore';

import {auth, db} from "./js/firebase.js";

import {UserSession} from "./models/User.js";


const authUser = ref(0);
auth.onAuthStateChanged(async user => {
  if (user) {
    const docRef = doc(db, 'users', user.uid);
    const profileSnap = await getDoc(docRef);

    authUser.value = new UserSession(user, profileSnap.data());

    console.log(authUser);

    console.log('Logged in as: ', user);
  } else {
    authUser.value = null;
    console.log('Logged out');
  }
});

function logout() {
  signOut(auth);
}

const loggedIn = computed(() => {
  console.log(authUser.value)
  return !!authUser.profile;
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
    <div v-if="authUser">
      <div class="flex-auto flex justify-end">
        <button class="btn">Notifications</button>
        <div class="dropdown dropdown-end">
          <img tabindex="0" role="button" class="rounded-full border-4 border-slate-400 h-20"
               :src="authUser.profile.photoURL"
               alt="Profile">
          <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-secondary border-4 border-slate-400 rounded-box p-2 w-40">
            <li><RouterLink :to="{name: 'profile', params: {id: authUser.user.uid}}">Profile</RouterLink></li>
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
