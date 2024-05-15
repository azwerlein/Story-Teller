<script setup>

import CharacterList from "../components/CharacterList.vue";
import CreateCharacterModal from "../components/CreateCharacterModal.vue";

import {computed, ref} from "vue";
import {collection, doc, deleteDoc, query, where, setDoc} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {characterConverter} from "../models/Character.js";
import {useCollectionSnapshotListener, useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import {useSessionStore} from "../js/store.js";
import {usePictureInput} from "../composables/PictureInput.js";
import {storyConverter} from "../models/Story.js";

const store = useSessionStore();

const props = defineProps({
  storyId: {
    type: String,
    required: true,
  },
});

const story = ref(null);
useDocumentSnapshotListener(doc(db, 'stories', props.storyId).withConverter(storyConverter), data => story.value = data);

const characters = ref([]);
const characterCollection = collection(db, 'stories', props.storyId, 'characters').withConverter(characterConverter);
const characterQuery = query(characterCollection);
useCollectionSnapshotListener(characterQuery, characters);


function addCharacter(character) {
  character.storyId = props.storyId;
  character.authorId = store.userSession.profile.uid;
  let uid = character.name.split(' ').join('-');
  uid = uid.toLowerCase();

  uploadPicture(uid, 'characters')
      .then(url => {
        character.photoURL = url;
        setDoc(doc(characterCollection, uid).withConverter(characterConverter), character)
      })
      .catch(error => {
        console.error('Error: ', error.code, error.message);
      });
}

function deleteCharacter(uid) {
  deleteDoc(doc(characterCollection, uid))
      .catch(error => {
        console.error('Error: ', error.code, error.message);
      });
}

const {updatePicture, uploadPicture} = usePictureInput();


const myStory = computed(() => {
  return store.userSession?.profile.uid === story.value?.authorId;
});

</script>

<template>
  <div class="w-10/12 m-auto p-2">
    <RouterLink class="btn btn-neutral" :to="{name: 'home'}"><</RouterLink>
    <div v-if="story" class="p-8">
      <h1>{{story.title}}</h1>
      <CreateCharacterModal v-if="myStory" @save-image="updatePicture" @create-character="addCharacter"></CreateCharacterModal>
      <CharacterList
          :characters="characters"
          @delete-character="deleteCharacter"
      ></CharacterList>
    </div>
  </div>
</template>

<style scoped>

</style>