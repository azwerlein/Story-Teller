<script setup>

import SkeletonStoryCard from "../components/skeleton/SkeletonStoryCard.vue";
import SkeletonList from "../components/skeleton/SkeletonList.vue";
import StoryList from "../components/StoryList.vue";
import AsyncLoader from "../components/skeleton/AsyncLoader.vue";
import {collection, limit, query} from "firebase/firestore";
import {db} from "../js/firebase.js";
import {storyConverter} from "../models/Story.js";

const collectionRef = collection(db, 'stories').withConverter(storyConverter);
const allStoryQuery = query(collectionRef, limit(20));

</script>

<template>
  <div class="md:w-10/12 m-auto p-2">
    <h2 class="text-6xl text-center my-8">Browse</h2>
    <Suspense>
      <template #default>
        <AsyncLoader
            :query="allStoryQuery">
          <template #default="{list}">
            <StoryList :stories="list"
                       class="md:grid grid-cols-3 gap-4"
            ></StoryList>
          </template>
        </AsyncLoader>
      </template>
      <template #fallback>
        <SkeletonList
            :size="20"
            :skeleton="SkeletonStoryCard"
            class="md:grid grid-cols-3 gap-4"
        ></SkeletonList>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>

</style>