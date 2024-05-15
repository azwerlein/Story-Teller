<script setup>

import ImageEditorModal from "../components/imageEditor/ImageEditorModal.vue";

// To differentiate Vue and Firebase refs, use an alias.
import {ref as vRef, unref} from "vue";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {ref} from "firebase/database";

import {db, storage} from "../js/firebase.js";
import {profileConverter} from "../models/User.js";
import {useSessionStore} from "../js/store.js";
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";
import {usePictureInput} from "../composables/PictureInput.js";
import {router} from "../js/router.js";

const store = useSessionStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const profile = vRef(null);

const docRef = doc(db, 'users', props.id).withConverter(profileConverter);

function getProfile() {
  getDoc(docRef)
      .then(snap => {
        if (snap.exists()) {
          profile.value = snap.data();
        }
        console.log(profile.value);
      })
      .catch(error => {
        console.log('Error: ', error.code, error.message);
      });
}
getProfile();

// Updates the profile
function updateProfile() {
  if (picture.value) {
    uploadPicture(props.id, 'avatars')
        .then(url => {
          unref(profile).photoURL = url;
        })
        .then(() => {
          setDoc(docRef, profile.value);
        })
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  } else {
    setDoc(docRef, profile.value)
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  }
}

const {picture, updatePicture, uploadPicture} = usePictureInput();

function goToProfile() {
  router.push({name: 'profile', params: {id: store.userSession?.profile.uid ?? ''}});
}

</script>

<template>
  <div class="flex justify-center p-8">
    <div v-if="store.userSession?.profile.uid === id && profile"
         class="w-64 m-auto">
      <label class="label" for="nameInput">Display Name</label>
      <input class="form-control w-full p-4 rounded-md"
             type="text"
             id="nameInput"
             required
             v-model="profile.displayName">
      <label class="label" for="bioInput">Bio</label>
      <textarea class="form-control w-full p-4 rounded-md" v-model="profile.bio"></textarea>

      <ImagePreviewInput label="Profile picture: "
                         id="avatarInput"
                         @save-image="updatePicture"></ImagePreviewInput>

      <div class="flex flex-col md:flex-row gap-4 my-4 justify-around">
        <button class="btn btn-primary min-w-20" @click="updateProfile(); goToProfile();">Save</button>
        <button class="btn btn-neutral min-w-20" @click="goToProfile();">Cancel</button>
      </div>
    </div>
    <div v-else>
      <h2>Error: You can't edit this profile.</h2>
    </div>
  </div>

</template>

<style scoped>

</style>