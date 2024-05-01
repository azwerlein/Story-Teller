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
  <form @submit.prevent="login">
    <label class="label" for="emailInput">Email</label>
    <input class="form-control" type="text" id="emailInput" placeholder="Email" required>
    <label class="label" for="passwordInput">Password</label>
    <input class="form-control" type="text" id="passwordInput" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped>

</style>