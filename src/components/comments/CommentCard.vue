<script setup>
import CommentPost from "../../models/CommentPost.js";

const props = defineProps({
  comment: {
    type: CommentPost,
    required: true,
  },
});
</script>

<template>
  <div class="py-2 border-y-2 border-neutral">
    <div class="card-body">
      <h4>{{ props.comment.author }}</h4>
      <div>{{ props.comment.content }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>