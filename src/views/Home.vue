<script setup>
import CreateStoryModal from "../components/CreateStoryModal.vue";

import {db} from "../js/firebase.js";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {storyConverter} from "../models/Story.js";
import {useSessionStore} from "../js/store.js";
import AsyncLoader from "../components/skeleton/AsyncLoader.vue";
import SkeletonList from "../components/skeleton/SkeletonList.vue";
import SkeletonStoryCard from "../components/skeleton/SkeletonStoryCard.vue";

const StoryList = defineAsyncComponent(() => import("../components/StoryList.vue"));

const store = useSessionStore();


const collectionRef = collection(db, 'stories').withConverter(storyConverter);
const allStoryQuery = query(collectionRef);
// This is in function form to wait until the auth state is settled.
function getUserStoryQuery() {
  return query(collectionRef, where('authorId', '==', store.userSession?.profile.uid));
}


function createStory(story) {
  let uid = story.title.split(' ').join('-');
  uid = uid.toLowerCase();
  story.authorId = store.userSession?.profile.uid;
  console.log(story);
  const docRef = doc(db, 'stories', uid).withConverter(storyConverter);
  setDoc(docRef, story)
      .catch(error => {
        console.log('Error: ', error.code, error.message);
      });
}

</script>

<template>
  <div>
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
        <Suspense v-if="store.userSession">
          <template #default>
            <AsyncLoader
                :query="getUserStoryQuery()">
              <template #default="{list}">
                <StoryList :stories="list"></StoryList>
              </template>
            </AsyncLoader>
          </template>
          <template #fallback>
            <SkeletonList
                :size="3"
                :skeleton="SkeletonStoryCard"
            ></SkeletonList>
          </template>
        </Suspense>
      </div>
      <div class="w-full p-8">
        <h2>Explore</h2>
        <Suspense>
          <template #default>
            <AsyncLoader
                :query="allStoryQuery">
              <template #default="{list}">
                <StoryList :stories="list"></StoryList>
              </template>
            </AsyncLoader>
          </template>
          <template #fallback>
            <SkeletonList
                :size="3"
                :skeleton="SkeletonStoryCard"
            ></SkeletonList>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>