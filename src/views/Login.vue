<script setup>
import {router} from "../js/router.js";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {ref} from "vue";

const emailInput = ref(null);
const passwordInput = ref(null);
const errorText = ref(null);

const user = ref({
  username: '',
  password: '',
});

function login() {
  if (!validateFields()) {
    return;
  }
  const auth = getAuth();
  signInWithEmailAndPassword(auth, user.value.username, user.value.password)
      .then(() => {
        router.push('home');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          errorText.value.innerText = 'Username must be an email.';
          errorText.value.classList.remove('hidden');
        } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
          errorText.value.innerText = 'Username or password is incorrect.';
          errorText.value.classList.remove('hidden');
        }
        console.log('Error: ', error.code, error.message);
      });
}


const invalidClass = 'invalid';
function validateFields() {
  let valid = true;
  if (!user.value.username) {
    valid = false;
    emailInput.value.classList.add(invalidClass);
  } else {
    emailInput.value.classList.remove(invalidClass);
  }
  if (!user.value.password) {
    valid = false;
    passwordInput.value.classList.add(invalidClass);
  } else {
    passwordInput.value.classList.remove(invalidClass);
  }

  return valid;
}
</script>

<template>
  <div>
    <h2 class="text-6xl text-center my-8">Sign in</h2>
    <div class="w-64 md:w-1/3 p-4 m-auto">
      <label class="label" for="emailInput">Email</label>
      <input class="form-control w-full p-2 rounded-md" type="text" id="emailInput" ref="emailInput" v-model="user.username" required>
      <p class="invalid-message">The email is required.</p>

      <label class="label" for="passwordInput">Password</label>
      <input class="form-control w-full p-2 rounded-md" type="password" id="passwordInput" ref="passwordInput" v-model="user.password" required>
      <p class="invalid-message">The password is required.</p>

      <p class="hidden my-4 text-red-600" ref="errorText"></p>
      <div class="flex flex-col content-center">
        <button class="btn btn-primary mt-8" v-on:click="login">Login</button>
        <RouterLink class="link text-center mt-4" :to="{name: 'register'}">Create an account</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>