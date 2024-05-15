<script setup>
import CommentPost from "../../models/CommentPost.js";
import {ref} from "vue";
import CommentInput from "./CommentInput.vue";
import {useSessionStore} from "../../js/store.js";

const store = useSessionStore();

const props = defineProps({
  comment: {
    type: CommentPost,
    required: true,
  },
});

const replying = ref(false);

function setReplyingTo(wantsToReply) {
  if (store.userSession) {
    replying.value = wantsToReply;
  } else {
    replying.value = false;
  }
}
</script>

<template>
  <div class="py-2 border-y-2 border-neutral">
    <div class="card-body">
      <h4>{{ comment.author }}</h4>
      <div>{{ comment.content }}</div>
      <div class="flex justify-between">
        <p>{{ comment.date.toLocaleDateString() }}</p>
        <div class="flex justify-end gap-x-4">
          <button class="btn-none" @click="setReplyingTo(true)">Reply</button>
          <button class="btn-none">Report</button>
        </div>
      </div>
    </div>
    <CommentInput v-if="replying"
                  class="ms-10"
                  :type="comment.type"
                  :original-post-id="comment.originalPostId"
    ></CommentInput>
  </div>
</template>

<style scoped>

</style>