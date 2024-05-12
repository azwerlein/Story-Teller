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

const store = useSessionStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const profile = vRef(null);
const picture = vRef(null);

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
    uploadPicture(props.id)
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  }
  updateDoc(docRef, profile.value)
      .catch(error => {
        console.log('Error: ', error.code, error.message);
      });
}

// Returns a promise after uploading the picture to storage
async function uploadPicture(uid) {
  const avatarsRef = ref(storage, 'avatars/' + uid);
  return uploadBytes(avatarsRef, this.picture)
      .then(snapshot => {
        return getDownloadURL(snapshot.ref);
      })
      .then(url => {
        profile.value.photoURL = url;
      })
      .catch(error => {
        console.log('Error: ', error);
      });
}

function updatePicture(blob) {
  picture.value = blob;
}

</script>

<template>
  <div>
    <div v-if="store.userSession?.user.uid === id">
      <label class="label" for="nameInput">Display Name</label>
      <input class="form-control w-full"
             type="text"
             id="nameInput"
             required
             v-model="profile.displayName">
      <ImageEditorModal
          @save-image="updatePicture"
      ></ImageEditorModal>

      <div class="flex justify-end">
        <button class="btn btn-primary" @click="updateProfile">Save</button>
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