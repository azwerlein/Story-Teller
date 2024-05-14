<script setup>

import {CharacterDescription} from "../models/Character.js";
import {computed, ref, watch} from "vue";

const props = defineProps({
  section: {
    type: CharacterDescription,
    required: true,
  },
});

const emit = defineEmits(['updateDescription']);

// const name = ref(props.section.name);
// const description = ref(props.section.description);

const heading = ref(null);
const content = ref(null);

const editMode = ref(false);

function enterEditMode() {
  editMode.value = true;
}

function cancelChanges() {
  editMode.value = false;
  heading.value.textContent = props.section.name;
  content.value.textContent = props.section.description;
}

function saveChanges() {
  editMode.value = false;
  props.section.name = heading.value.textContent;
  props.section.description = content.value.textContent;
  emit('updateDescription', props.section);
}

</script>

<template>
  <section class="p-4">
    <div class="flex justify-between">
      <div v-bind:class="{headingPlaceholder: editMode}"
           v-bind:contenteditable="editMode"
           class="text-2xl font-semibold border-b-2 border-primary min-h-8 w-full"
           ref="heading"
      >{{ section.name }}</div>
      <div class="me-5" @click="enterEditMode">
        <i class="fa-solid fa-pencil fa-lg"></i>
      </div>
    </div>
    <div v-bind:class="{contentPlaceholder: editMode}"
         v-bind:contenteditable="editMode"
         class="min-h-8"
         ref="content"
    >{{ section.description }}</div>
    <div v-if="editMode">
              <button class="btn btn-neutral me-2" @click="cancelChanges">Cancel</button>
              <button class="btn btn-primary ms-2" @click="saveChanges">Save</button>
    </div>
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