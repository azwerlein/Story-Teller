<script setup>
import {ref} from "vue";
import {auth} from "./js/firebase.js";
import {signOut} from "firebase/auth";


const authUser = ref(null);
auth.onAuthStateChanged(user => {
  if (user) {
    authUser.value = user;

    console.log('Logged in as: ', user);
  } else {
    authUser.value = null;
    console.log('Logged out');
  }
});

function logout() {
  signOut(auth);
}
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
      <h2>Community</h2>
    </div>
    <div v-if="authUser">
      <div class="flex-auto flex justify-end">
        <button class="btn">Notifications</button>
        <button class="btn" v-on:click="logout">Logout</button>
<!--        <RouterLink :to="{name: 'profile'}">-->
<!--          <div v-if="authUser.value.photoURL">-->
<!--            <div class="avatar">-->
<!--              <img class="rounded-full border-4 border-slate-400" src="./assets/profilepic.jpg"-->
<!--                   alt="Profile">-->
<!--            </div>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <div class="avatar placeholder">-->
<!--              <span>{{ authUser.value.email[0] }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--      </RouterLink>-->
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
