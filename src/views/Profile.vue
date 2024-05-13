<script setup>
import {db} from "../js/firebase.js";
import {collection, doc, getDoc, query, where} from "firebase/firestore";
import {profileConverter, UserSession} from "../models/User.js";
import {ref} from "vue";
import CommentSection from "../components/CommentSection.vue";
import {useSessionStore} from "../js/store.js";
import StoryList from "../components/StoryList.vue";
import {useCollectionSnapshotListener, useDocumentSnapshotListener} from "../composables/SnapshotListener.js";
import {characterConverter} from "../models/Character.js";
import {storyConverter} from "../models/Story.js";

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
  <div v-if="profile" class="w-32 m-auto content-ce">
    <div class="profile relative">
      <img class="rounded-full border-4 border-neutral-content" :src="profile.photoURL" alt="Profile Picture"/>
      <div class="absolute right-0 bottom-0 rounded-full border-2 border-neutral-content px-2 bg-base-100">
        <p class="">3</p>
      </div>
    </div>
    <div class="progress">

    </div>
    <p>{{ profile.displayName }}</p>
    <div v-if="store.userSession?.user.uid === id" class="flex justify-center">
      <RouterLink class="btn" :to="{name: 'editprofile', params: {id: id}}">Edit Profile</RouterLink>
    </div>
    <div v-else class="flex justify-center">
      <button class="btn">Follow</button>
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
    <!--    <CommentSection></CommentSection>-->
  </div>
  <div v-else class="flex justify-center">
    <h1 class="text-3xl">That profile doesn't exist.</h1>
  </div>
</template>

<style scoped>

</style>