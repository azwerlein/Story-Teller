<script setup>
import ImageEditorModal from "./ImageEditorModal.vue";
import {ref} from "vue";

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 256,
  },
  height: {
    type: Number,
    default: 256,
  }
});

const emit = defineEmits(['saveImage']);

const imageEditor = ref(null);
const preview = ref(null);

const scale = ref(1);
const picture = ref(null);

function editPicture(event) {
  console.log(event)
  scale.value = 1;
  const target = event.target;
  if (!target || !target.files) {
    return;
  }
  picture.value = target.files[0];
  let reader = new FileReader();
  reader.onloadend = () => {
    const image = new Image();
    image.src = reader.result;
    image.onload = () => {
      imageEditor.value.showPreview(image);
    }
  }
  reader.readAsDataURL(picture.value);
}
function updatePicture(blob) {
  console.log(blob);
  emit('saveImage', blob);
  const url = URL.createObjectURL(blob);
  preview.value.onload = () => URL.revokeObjectURL(url);
  preview.value.src = url;
}
</script>

<template>
  <label class="label" :for="id">{{ label }}</label>
  <input class="form-control w-full"
         type="file"
         :id="id"
         alt="Profile Picture"
         accept="image/png, image/jpeg, image/jpg"
         v-on:change="editPicture"/>
  <img ref="preview" src="" alt="Profile Picture Preview">

  <ImageEditorModal ref="imageEditor"
                    @save-image="updatePicture"
                    :width="width"
                    :height="height"
  ></ImageEditorModal>
</template>

<style scoped>

</style>