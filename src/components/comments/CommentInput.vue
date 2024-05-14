<script setup>

import {useSessionStore} from "../../js/store.js";
import {ref} from "vue";
import CommentPost from "../../models/CommentPost.js";

const store = useSessionStore();

const props = defineProps({
  originalPostId: {
    type: String,
    required: true,
  },
  precursorId: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  }
});

const emit = defineEmits(['postComment']);

const commentInput = ref(null);
const editMode = ref(false);

function beginEdit() {
  editMode.value = true;
  commentInput.value.focus();
  commentInput.value.click();
}

function postComment() {
  let comment = new CommentPost();
  comment.author = store.userSession.user.uid;
  comment.content = commentInput.value.innerHTML;
  comment.originalPost = props.originalPostId;
  comment.precursor = props.precursorId ?? '';
  comment.type = props.type;
  emit('postComment', comment);

  commentInput.value.innerHTML = '';
  editMode.value = false;
}

function cancelComment() {
  commentInput.value.innerHTML = '';
  editMode.value = false;
}

</script>

<template>

  <div>
    <div v-if="store.userSession?.profile" class="flex">
      <div class="w-16 h-16 mb-4">
        <img class="rounded-full border-neutral border-2" :src="store.userSession.profile?.photoURL" alt="Profile">
      </div>
      <div class="w-full p-8">
        <div ref="commentInput"
             class="cursor-text w-full h-full border-neutral border-2 bg-base-100"
             contenteditable="true"
             v-bind:class="{ commentPlaceholder: !editMode }"
             @click="beginEdit"
        >
        </div>
        <div v-if="editMode"
             class="flex justify-end">
          <button class="btn btn-neutral"
                  @click="cancelComment">Cancel</button>
          <button class="btn btn-primary"
                  @click="postComment">Post</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>
        <RouterLink :to="{name: 'login'}">Sign in</RouterLink>
        to post a comment.
      </p>
    </div>
  </div>
</template>

<style scoped>
.commentPlaceholder::before {
  content: 'Add a comment';
  @apply text-neutral-content/40;
}
</style>