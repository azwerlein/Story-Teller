<script setup>

import {ref} from "vue";
import CommentInput from "./CommentInput.vue";
import CommentCard from "./CommentCard.vue";
import CommentPost, {commentConverter} from "../../models/CommentPost.js";
import {useCollectionSnapshotListener} from "../../composables/SnapshotListener.js";
import {addDoc, collection, query, where} from "firebase/firestore";
import {db} from "../../js/firebase.js";

const props = defineProps({
  originalPostId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const comments = ref([
  new CommentPost('Alexander', 'This is a comment.'),
  new CommentPost('Mio', 'This is a comment.'),
  new CommentPost('Tommy', 'This is a comment.'),
]);

const collectionRef = collection(db, 'comments').withConverter(commentConverter);
const q = query(collectionRef, where('originalPost', '==', props.originalPostId));
useCollectionSnapshotListener(q, comments);

function uploadComment(comment) {
  addDoc(collectionRef, comment)
      .then((snapshot) => {
        console.log('Successfully uploaded comment');
      })
      .catch(error => {
        console.error('ERROR: ', error.code, error.message);
      });
}

</script>

<template>
  <div class="p-8">
    <CommentInput :original-post-id="originalPostId"
                  :type="type"
                  @post-comment="uploadComment"
    ></CommentInput>

    <CommentCard v-for="comment in comments"
                 :comment="comment"
    ></CommentCard>
  </div>
</template>

<style scoped>

</style>