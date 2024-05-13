<script setup>
import StoryList from "../components/StoryList.vue";
import CreateStoryModal from "../components/CreateStoryModal.vue";
import {db} from "../js/firebase.js";
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
useCollectionSnapshotListener(query(collectionRef, where('authorId', '==', store.userSession?.user.uid ?? '')), userStories);

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
  <div class="grid grid-cols-5">
    <div class="col-start-1 bg-base-200 p-4">
      <h2 class="text-xl">Your Stories</h2>
      <CreateStoryModal v-if="store.userSession"
                        :user-session="store.userSession"
                        @create-story="createStory"
      ></CreateStoryModal>
      <StoryList :stories="userStories"></StoryList>
    </div>
    <div class="col-start-2 col-span-3 border-x-2 border-neutral p-4">
      <h2 class="text-xl">Feed</h2>
      <StoryList :stories="stories"></StoryList>
    </div>
    <div class="col-start-5 bg-base-200 p-4">
      <!--      // Placeholder-->
      <h1>Explore</h1>
      <StoryList :stories="stories"></StoryList>
<!--      <div class="my-2 bg-neutral card-body">-->
<!--        <h1>inspiration placeholder</h1>-->
<!--      </div>-->
<!--      <div class="my-2 bg-neutral card-body">-->
<!--        <h1>inspiration placeholder</h1>-->
<!--      </div>-->
<!--      <div class="my-2 bg-neutral card-body">-->
<!--        <h1>inspiration placeholder</h1>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style scoped>

</style>