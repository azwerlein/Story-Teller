<script setup>

import CharacterList from "../components/CharacterList.vue";

import {ref} from "vue";
import {addDoc, collection, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import Character, {characterConverter} from "../models/Character.js";
import {useSessionStore} from "../js/store.js";
import {useCollectionSnapshotListener} from "../composables/SnapshotListener.js";

const store = useSessionStore();

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});


const characters = ref([]);
const collectionRef = collection(db, 'stories', props.storyId, 'characters').withConverter(characterConverter);

const q = query(collectionRef);
const unsubscribe = useCollectionSnapshotListener(q, characters);

// {
//   getDocs(query(collectionRef))
//       .then(snapshot => {
//         snapshot.forEach(doc => {
//           characters.value.push(doc.data());
//         });
//       })
//       .catch(error => {
//         console.log('ERROR: ', error.code, error.data);
//       });
// }

function addCharacter() {
  addDoc(collectionRef, new Character('Tom'))
      .catch(error => {
        console.log('ERROR: ', error.code, error.data);
      });
}

</script>

<template>
  <div class="m-auto w-10/12">
    {{ storyId }}
    <button class="btn"
            @click="addCharacter"
    >Add dummy character
    </button>
    <CharacterList
        :characters="characters"
    ></CharacterList>
  </div>
</template>

<style scoped>

</style>