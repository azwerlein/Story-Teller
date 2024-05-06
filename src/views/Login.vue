<script>
import {router} from "../js/router.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default {
  name: "Login",
  methods: {
    login() {
      let username = document.getElementById("emailInput").value;
      let password = document.getElementById("passwordInput").value;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, username, password)
          .then(() => {
            router.push('home');
          })
          .catch((error) => {
            console.log('Error: ', error.code, error.message);
          });
    },
  },
}
</script>

<template>
  <div class="w-64 content-center m-auto">
    <label class="label" for="emailInput">Email</label>
    <input class="form-control w-full" type="text" id="emailInput" placeholder="Email" required>
    <label class="label" for="passwordInput">Password</label>
    <input class="form-control w-full" type="text" id="passwordInput" placeholder="Password" required>
    <button class="btn" v-on:click="login">Login</button>
    <RouterLink class="link" :to="{name: 'register'}">Create an account</RouterLink>
  </div>
</template>

<style scoped>

</style>