<script setup>
import {createUserWithEmailAndPassword, deleteUser} from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import {router} from "../js/router.js";
import {auth, db, storage} from "../js/firebase.js";

import {Profile, profileConverter} from '../models/User.js';
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";

import {ref as vRef} from 'vue'

const account = vRef({
  email: '',
  password: '',
});
const profile = vRef(new Profile());
const picture = vRef({});

let temporaryUser;

function createAccount() {
  createUserWithEmailAndPassword(auth, account.value.email, account.value.password)
      .then((userCredential) => {
        temporaryUser = userCredential.user;
        return createProfile(temporaryUser.uid);
      })
      .then(() => {
        router.push('home');
      })
      .catch(error => {
        console.log('Error: ', error.code, error.message);
        if (temporaryUser !== undefined) {
          deleteUser(temporaryUser)
              .then(() => {
                temporaryUser = null;
                console.log('User deleted.');
              })
              .catch(error => {
                console.error('Error: ', error.code, error.message);
              });
        }
      });
}

function createProfile(uid) {
  profile.value.internalId = uid;
  let profileId = profile.value.displayName.split(' ').join('-');
  profileId = profileId.toLowerCase();
  const avatarsRef = ref(storage, 'images/avatars/' + profileId);
  return uploadBytes(avatarsRef, picture.value)
      .then(snapshot => {
        return getDownloadURL(snapshot.ref);
      })
      .then(url => {
        profile.value.photoURL = url;
        const docRef = doc(db, 'users', profileId).withConverter(profileConverter);
        setDoc(docRef, profile.value);
      })
      .catch(error => {
        console.error('Error: ', error.code, error.message);
      });
}

function updatePicture(blob) {
  picture.value = blob;
}
</script>

<template>
  <div>
    <h2 class="text-6xl text-center my-8">Create an account</h2>
    <div class="w-64 md:w-1/3 content-center m-auto">
      <label class="label" for="emailInput">Email</label>
      <input class="form-control w-full p-2 rounded-md"
             type="email"
             id="emailInput"
             required
             v-model="account.email">
      <label class="label" for="passwordInput">Password</label>
      <input class="form-control w-full p-2 rounded-md"
             type="password"
             id="passwordInput"
             required
             v-model="account.password">
      <label class="label" for="nameInput">Display Name</label>
      <input class="form-control w-full p-2 rounded-md"
             type="text"
             id="nameInput"
             required
             v-model="profile.displayName">
      <ImagePreviewInput
          id="avatar"
          label="Avatar: "
          @save-image="updatePicture"
      ></ImagePreviewInput>
      <div class="flex flex-col content-center">
        <button class="btn btn-primary mt-8" type="button" @click="createAccount">Create account</button>
        <RouterLink class="link text-center mt-4" :to="{name: 'login'}">I already have an account.</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>