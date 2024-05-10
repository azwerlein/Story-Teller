<script setup>
import {db} from "../js/firebase.js";
import {doc, getDoc} from "firebase/firestore";
import {Profile} from "../models/User.js";
import {ref} from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const profile = ref(new Profile());

{
  const docRef = doc(db, 'users', props.id);
  getDoc(docRef)
      .then(snap => {
        if (snap.exists()) {
          const data = snap.data();
          profile.value.displayName = data.displayName;
          profile.value.photoURL = data.photoURL;
        }
        console.log(profile.value);
      })
      .catch(error => {
        console.log('Error: ', error.code, error.message);
      });
}


</script>

<template>
  <div v-if="profile" class="w-32 m-auto content-ce">
    <div class="profile">
      <img class="rounded-full border-4 border-slate-400" :src="profile.photoURL" alt="Profile Picture"/>
      <div class="level">
        <p class="rounded-full border-2 border-slate-400 p-auto">3</p>
      </div>
    </div>
    <div class="progress">

    </div>
    <p>{{ profile.displayName }}</p>
  </div>
</template>

<style scoped>
.profile {
  position: relative;
}

.profile > .level {
  position: absolute;
  right: 0;
  bottom: 10%;
  width: auto;
}

</style>