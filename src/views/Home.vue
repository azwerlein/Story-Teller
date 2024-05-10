<script setup>
import StoryList from "../components/StoryList.vue";
import CreateStoryModal from "../components/CreateStoryModal.vue";
import {UserSession} from "../models/User.js";
import {db} from "../js/firebase.js";
import {collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {onMounted, ref} from "vue";
import {storyConverter} from "../models/Story.js";

const props = defineProps({
  userSession: {
    type: UserSession,
  },
});

const stories = ref([]);

onMounted(() => {
  if (props.userSession) {
    const collectionRef = collection(db, 'stories').withConverter(storyConverter);
    const q = query(collectionRef, where('authorId', '==', props.userSession.user.uid));
    getDocs(q)
        .then(snapshot => {
          snapshot.forEach(doc => {
            stories.value.push(doc.data());
          });
        })
        .catch(error => {
          console.log(error);
        });
  }
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
  <div class="grid grid-cols-6 gap-12">
    <div class="col-start-3 col-span-2">
      <CreateStoryModal v-if="userSession"
                        :user-session="userSession"
                        @create-story="createStory"
      ></CreateStoryModal>
      <StoryList :stories="stories"></StoryList>
    </div>
    <div class="col-start-5">
      <!--      // Placeholder-->
      <h1>Inspiration list</h1>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
      <div class="my-2 bg-neutral card-body">
        <h1>inspiration placeholder</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>