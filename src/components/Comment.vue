<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="py-2 border-y-2 border-neutral">
    <div class="card-body">
      <h4>{{ props.comment.author }}</h4>
      <p>{{ props.comment.content }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>