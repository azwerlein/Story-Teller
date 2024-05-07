<script>
import UserList from "../components/UserList.vue";

import {collection, doc, getDocs, limit, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {Profile} from "../models/User.js";

export default {
  name: "Community",
  components: {UserList},
  data() {
    return {
      users: [],
    }
  },
  beforeCreate() {
    const q = query(collection(db, 'users'), limit(5));
    getDocs(q)
        .then(snap => {
          snap.forEach(doc => {
            console.log(doc.data());
            let profile = new Profile();
            profile.displayName = doc.data().displayName;
            profile.photoURL = doc.data().photoURL;
            this.users.push({id: doc.id, profile: profile});
          });
        })
        .catch(error => {
          console.log('Error: ', error.code, error.message);
        });
  }
}
</script>

<template>
  <UserList :users="users"></UserList>
</template>

<style scoped>

</style>