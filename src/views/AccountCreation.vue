<script>
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {router} from "../js/router.js";
import {auth, db, storage} from "../js/firebase.js";

export default {
  name: "AccountCreation",
  methods: {
    createAccount() {
      let email = document.getElementById("emailInput").value;
      let password = document.getElementById("passwordInput").value;
      let displayName = document.getElementById('nameInput').value;
      let picture = document.getElementById('pictureInput').value;
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            let user = userCredential.user;
            storage.child('avatars/' + user.uid)
                .put(picture)
                .then(snapshot => {
                  return snapshot.ref.getDownloadURL();
                })
                .then(url => {
                  user.updateProfile({photoURL: url});
                })
            ;
            updateProfile(user, {
              displayName: displayName,
            });
            router.push('home');
          })
          .catch(error => {
            console.log('Error: ', error.code, error.message);
          });
    },
  },
}
</script>

<template>
  <h4></h4>
  <div class="w-64 content-center m-auto">
    <label class="label" for="emailInput">Email</label>
    <input class="form-control w-full" type="text" id="emailInput" required>
    <label class="label" for="passwordInput">Password</label>
    <input class="form-control w-full" type="text" id="passwordInput" required>
    <label class="label" for="nameInput">Display Name</label>
    <input class="form-control w-full" type="text" id="nameInput" required>
    <label class="label" for="avatar">Profile Picture</label>
    <input class="form-control w-full" type="file" id="avatar" alt="Profile Picture"
           accept="image/png, image/jpeg, image/jpg"/>
    <button class="btn" v-on:click="createAccount">Create Account</button>
  </div>
</template>

<style scoped>

</style>