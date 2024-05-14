<script>
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import {router} from "../js/router.js";
import {auth, db, storage} from "../js/firebase.js";

import {Profile} from '../models/User.js';
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";

export default {
  name: "AccountCreation",
  components: {ImagePreviewInput},
  data() {
    return {
      account: {
        email: '',
        password: '',
      },
      user: new Profile(),
      picture: {},
    }
  },
  methods: {
    createAccount() {
      createUserWithEmailAndPassword(auth, this.account.email, this.account.password)
          .then((userCredential) => {
            let user = userCredential.user;
            this.createProfile(user.uid);
          })
          .then(() => {
            router.push('home');
          })
          .catch(error => {
            console.log('Error: ', error.code, error.message);
          });
    },
    createProfile(uid) {
      const avatarsRef = ref(storage, 'avatars/' + uid);
      uploadBytes(avatarsRef, this.picture)
          .then(snapshot => {
            return getDownloadURL(snapshot.ref);
          })
          .then(url => {
            this.user.photoURL = url;
            const docRef = doc(db, 'users', uid);
            setDoc(docRef, this.user)
                .catch(error => {
                  console.log('Error: ', error.code, error.data);
                });
          })
          .catch(error => {
            console.log('Error: ', error);
          });
    },
    updatePicture(blob) {
      this.picture = blob;
    }
  },
}
</script>

<template>
  <div class="w-64 content-center m-auto">
    <form v-on:submit.prevent="createAccount">
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
             v-model="user.displayName">
      <ImagePreviewInput
          id="avatar"
          label="Avatar: "
          @save-image="updatePicture"
      ></ImagePreviewInput>
      <button class="btn btn-primary" type="submit">Create Account</button>
    </form>
  </div>
</template>

<style scoped>

</style>