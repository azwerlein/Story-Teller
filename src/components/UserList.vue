<script setup>
import UserCard from "./UserCard.vue";

defineProps({
  users: {
    type: Array,
    required: true,
  }
});


</script>

<template>
  <div>
    <TransitionGroup name="list">
      <UserCard v-for="user in users"
                :profile="user"
                :key="user.uid"
                class="my-2"></UserCard>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>