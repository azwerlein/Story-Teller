<script setup>
import {ref} from "vue";
import {auth} from "./js/firebase.js";


// Perhaps I should use Pinia to allow users to configure their page layouts?

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
    <div class="flex-auto flex justify-end">
      <button class="btn">Notifications</button>
      <RouterLink :to="{name: 'login'}" class="btn">Login</RouterLink>
    </div>
  </header>

  <main>
    <RouterView :auth-user="authUser"></RouterView>
  </main>

</template>

<style scoped>

</style>
