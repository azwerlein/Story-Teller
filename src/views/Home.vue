<script setup>
import StoryList from "../components/StoryList.vue";
import CreateStoryModal from "../components/CreateStoryModal.vue";

import {auth, db} from "../js/firebase.js";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {onMounted, ref} from "vue";
import {storyConverter} from "../models/Story.js";
import {useSessionStore} from "../js/store.js";
import {useCollectionSnapshotListener} from "../composables/SnapshotListener.js";

const store = useSessionStore();

const stories = ref([]);
const userStories = ref([]);

const collectionRef = collection(db, 'stories').withConverter(storyConverter);

useCollectionSnapshotListener(query(collectionRef), stories);


// auth.authStateReady()
//     .then(() => {
//       console.log('Hello')
//       console.log(auth.currentUser);
//       useCollectionSnapshotListener(query(collectionRef, where('authorId', '==', store.userSession?.user.uid ?? '')), userStories);
//     })
//     .catch(error => {
//       console.log('Error: ', error.code, error.message);
//     });


onMounted(async () => {
  await auth.authStateReady();
  useCollectionSnapshotListener(query(collectionRef, where('authorId', '==', store.userSession?.user.uid ?? '')), userStories);
});


function createStory(story) {
  let uid = story.title.split(' ').join('-');
  uid = uid.toLowerCase();
  const docRef = doc(db, 'stories', uid).withConverter(storyConverter);
  setDoc(docRef, story)
      .catch(error => {
        console.log('Error: ', error.code, error.data);
      });
}

</script>

<template>
  <h1 class="text-6xl text-center my-8">Story Teller</h1>
  <div class="flex flex-auto flex-col md:flex-row w-10/12 m-auto">
    <div class="w-full p-8">
      <div class="flex justify-between items-center">
        <h2>Your Stories</h2>
        <CreateStoryModal v-if="store.userSession"
                          :user-session="store.userSession"
                          @create-story="createStory"
        ></CreateStoryModal>
      </div>
      <StoryList :stories="userStories"></StoryList>
    </div>
    <!--    <div class="border-x-2 border-neutral p-4">-->
    <!--      <h2>Feed</h2>-->
    <!--      <StoryList :stories="stories"></StoryList>-->
    <!--    </div>-->
    <div class="w-full p-8">
      <h2>Explore</h2>
      <StoryList :stories="stories"></StoryList>
    </div>
  </div>
</template>

<style scoped>

</style>