<script setup>

import {CharacterDescription} from "../models/Character.js";
import {computed, ref, watch} from "vue";

const props = defineProps({
  section: {
    type: CharacterDescription,
    required: true,
  },
});

const heading = ref(null);
const content = ref(null);

const editMode = ref(false);

function enterEditMode() {
  editMode.value = true;
}

const isEmpty = computed(() => heading.value.innerHTML === '');

</script>

<template>
  <section class="border-2 border-neutral-content p-4">
    <div class="flex justify-between">
      <div v-bind:class="{headingPlaceholder: (editMode && isEmpty)}"
           v-bind:contenteditable="editMode"
           class="text-xl border-b-2 border-neutral min-h-8 w-full"
           ref="heading"
      >{{ section.name }}</div>
      <div class="me-5" @click="enterEditMode">
        <i class="fa-solid fa-pencil fa-lg"></i>
      </div>
    </div>
    <div v-bind:class="{contentPlaceholder: (editMode && isEmpty)}"
         v-bind:contenteditable="editMode"
         ref="content"
         class="min-h-8"
    >{{ section.description }}</div>
  </section>
</template>

<!--<style scoped>-->
<!--//.headingPlaceholder::before {-->
<!--//  content: 'Enter the section heading';-->
<!--//  @apply text-neutral-content/40;-->
<!--//}-->
<!--//-->
<!--//.contentPlaceholder::before {-->
<!--//  content: 'Enter the section content';-->
<!--//  @apply text-neutral-content/40;-->
<!--//}-->
<!--</style>-->