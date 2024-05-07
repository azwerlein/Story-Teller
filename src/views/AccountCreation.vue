<script>
import {createUserWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import {router} from "../js/router.js";
import {auth, db, storage} from "../js/firebase.js";

import {Profile} from '../models/User.js';

export default {
  name: "AccountCreation",
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
                .then(snapshot => {

                })
                .catch(error => {
                  console.log('Error: ', error.code, error.data);
                });
          })
          .catch(error => {
            console.log('Error: ', error.code, error.data);
          });
    },
    updatePicture(event) {
      const target = event.target;
      if (target && target.files) {
        this.picture = target.files[0];
      }
    }
  },
}
</script>

<template>
  <h4></h4>
  <div class="w-64 content-center m-auto">
    <label class="label" for="emailInput">Email</label>
    <input class="form-control w-full"
           type="text"
           id="emailInput"
           required
           v-model="account.email">
    <label class="label" for="passwordInput">Password</label>
    <input class="form-control w-full"
           type="text"
           id="passwordInput"
           required
           v-model="account.password">
    <label class="label" for="nameInput">Display Name</label>
    <input class="form-control w-full"
           type="text"
           id="nameInput"
           required
           v-model="user.displayName">
    <label class="label" for="avatar">Profile Picture</label>
    <input class="form-control w-full"
           type="file"
           id="avatar"
           alt="Profile Picture"
           accept="image/png, image/jpeg, image/jpg"
           v-on:change="updatePicture"/>
    <button class="btn" v-on:click="createAccount">Create Account</button>
  </div>
</template>

<style scoped>

</style>