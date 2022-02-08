<template>
  <div :style="styleObjectDiv" class="spinner"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Spinner",

  props: {
    width: {
      default: "25px",
      type: String,
    },
    height: {
      default: "25px",
      type: String,
    },
  },
  data() {
    return {
      styleObjectDiv: {
        width: this.width,
        height: this.height,
      },
    };
  },
});
</script>

<style lang="scss">
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
