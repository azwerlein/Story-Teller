<script setup>
import {db} from "../js/firebase.js";
import {collection, doc, getDoc, query, where} from "firebase/firestore";
import {profileConverter, UserSession} from "../models/User.js";
import {ref} from "vue";
import CommentSection from "../components/CommentSection.vue";
import {useSessionStore} from "../js/store.js";
import StoryList from "../components/StoryList.vue";
import {useCollectionSnapshotListener, useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import {storyConverter} from "../models/Story.js";
import {router} from "../js/router.js";

const store = useSessionStore();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const profile = ref(null);
useDocumentSnapshotListener(doc(db, 'users', props.id).withConverter(profileConverter), profile);

const stories = ref([]);
const storyQuery = query(collection(db, 'stories').withConverter(storyConverter), where('authorId', '==', props.id));
useCollectionSnapshotListener(storyQuery, stories);

const storiesTab = ref(null);
const badgesTab = ref(null);


</script>

<template>
  <div class="w-9/12 m-auto p-4">
    <button class="btn btn-neutral" @click="router.go(-1)"><</button>
    <div v-if="profile" class="m-auto content-ce">
      <div class="flex">
        <div class="w-64">
          <div class="profile relative">
            <img class="rounded-full border-4 border-neutral-content" :src="profile.photoURL" alt="Profile Picture"/>
            <div
                class="flex justify-center absolute w-16 h-16 right-0 bottom-0 rounded-full border-2 border-neutral-content px-2 bg-base-100">
              <h2 class="m-auto">3</h2>
            </div>
          </div>
          <progress class="progress my-4 h-8" :value="0" max="100">
            {{ profile.xp }}/100
          </progress>
          <h2>{{ profile.displayName }}</h2>
        </div>
        <div class="p-8">
          <h2>About</h2>
          <p>Hello! blablalba</p>
        </div>
      </div>
      <div v-if="store.userSession?.user.uid === id" class="flex justify-center">
        <RouterLink class="btn" :to="{name: 'editprofile', params: {id: id}}">Edit Profile</RouterLink>
      </div>
      <div v-else class="flex justify-center">
        <button class="btn">Follow</button>
      </div>
      <div class="p-8">
        <h2></h2>
        <p> {{ profile.bio }}</p>
      </div>
      <div>
        <div role="tablist" class="tabs tabs-boxed">
          <a role="tab"
             class="tab"
             @click=""
          >Badges</a>
          <a role="tab"
             class="tab tab-active"
             @click=""
          >Stories</a>
          <a role="tab"
             class="tab"
             @click=""
          >Characters</a>
        </div>
        <div ref="storiesTab">
          <StoryList :stories="stories"></StoryList>
        </div>
        <div ref="charactersTab">

        </div>
        <div ref="badgesTab">

        </div>
      </div>
      <CommentSection></CommentSection>
    </div>
    <div v-else class="flex justify-center">
      <h1 class="text-3xl">That profile doesn't exist.</h1>
    </div>
  </div>
</template>

<style scoped>

</style>