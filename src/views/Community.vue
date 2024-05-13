<script setup>
import UserList from "../components/UserList.vue";

import {collection, doc, getDocs, limit, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {profileConverter} from "../models/User.js";
import {ref} from "vue";
import {useCollectionSnapshotListener} from "../composables/SnapshotListener.js";

const users = ref([]);

const q = query(collection(db, 'users'), limit(5)).withConverter(profileConverter);

useCollectionSnapshotListener(q, users);

// new Promise(r => setTimeout(r, 0))
//     .then(() => getDocs(q))
//     .then(snap => {
//       snap.forEach(doc => {
//         let profile = new Profile();
//         profile.displayName = doc.data().displayName;
//         profile.photoURL = doc.data().photoURL;
//         users.value.push({id: doc.id, profile: profile});
//       });
//     })
//     .catch(error => {
//       console.log('Error: ', error.code, error.message);
//     });

</script>

<template>
  <UserList class="grid grid-cols-3 gap-4"
            :users="users"></UserList>
</template>

<style scoped>

</style>