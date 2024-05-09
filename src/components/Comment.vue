<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card bg-slate-500 my-2">
    <div class="card-body">
      <h4>{{ props.comment.author }}</h4>
      <p>{{ props.comment.content }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>