<script setup>
import {router} from "../js/router.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

function login() {
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
}
</script>

<template>
  <div class="w-64 md:w-1/3 p-4 m-auto">
    <label class="label" for="emailInput">Email</label>
    <input class="form-control w-full p-2 rounded-md" type="text" id="emailInput" required>
    <label class="label" for="passwordInput">Password</label>
    <input class="form-control w-full p-2 rounded-md" type="password" id="passwordInput" required>
    <div class="flex flex-col content-center">
      <button class="btn btn-primary mt-8" v-on:click="login">Login</button>
      <RouterLink class="link text-center mt-4" :to="{name: 'register'}">Create an account</RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>