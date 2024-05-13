<script setup>
import UserList from "../components/UserList.vue";

import {collection, doc, getDocs, limit, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {Profile} from "../models/User.js";
import {ref} from "vue";

const users = ref([]);

const q = query(collection(db, 'users'), limit(5));

new Promise(r => setTimeout(r, 0))
    .then(() => getDocs(q))
    .then(snap => {
      snap.forEach(doc => {
        let profile = new Profile();
        profile.displayName = doc.data().displayName;
        profile.photoURL = doc.data().photoURL;
        users.value.push({id: doc.id, profile: profile});
      });
    })
    .catch(error => {
      console.log('Error: ', error.code, error.message);
    });

</script>

<template>
  <UserList class="grid grid-cols-3 gap-4"
            :users="users"></UserList>
</template>

<style scoped>

</style>