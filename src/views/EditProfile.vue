<script setup>

import ImageEditorModal from "../components/imageEditor/ImageEditorModal.vue";

// To differentiate Vue and Firebase refs, use an alias.
import {ref as vRef} from "vue";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {ref} from "firebase/database";

import {db, storage} from "../js/firebase.js";
import {profileConverter} from "../models/User.js";
import {useSessionStore} from "../js/store.js";
import ImagePreviewInput from "../components/imageEditor/ImagePreviewInput.vue";
import {usePictureInput} from "../composables/PictureInput.js";

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
  console.log('ok')
  if (picture.value) {
    console.log('ok')
    uploadPicture(props.id, profile)
        .then(() => {
          setDoc(docRef, profile.value);
        })
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  } else {
    console.log('okay')
    setDoc(docRef, profile.value)
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  }
}

const {picture, updatePicture, uploadPicture} = usePictureInput();

</script>

<template>
  <div>
    <div v-if="store.userSession?.user.uid === id && profile">
      <label class="label" for="nameInput">Display Name</label>
      <input class="form-control w-full"
             type="text"
             id="nameInput"
             required
             v-model="profile.displayName">
      <ImagePreviewInput label="Profile picture: "
                         id="avatarInput"
                         @save-image="updatePicture"></ImagePreviewInput>

      <div class="flex justify-end">
        <button class="btn btn-success" @click="updateProfile">Save</button>
        <button class="btn btn-neutral" @click="getProfile">Cancel</button>
      </div>
    </div>
    <div v-else>
      Error
    </div>
  </div>

</template>

<style scoped>

</style>