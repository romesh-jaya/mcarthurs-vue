<template>
  <Button class="primary-button" @on-click="$emit('on-click')">
    <slot></slot>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "PrimaryButton",
  components: { Button },
  props: { buttonType: { default: "submit", type: String } },
  emits: ["on-click"],
});
</script>

<style lang="scss">
@import "../styles/globals.scss";

.primary-button {
  font-size: 1.75rem;
  padding-inline: 3rem;
  padding-block: 1rem;
  border-radius: 1rem;
  background-color: $text-color;
  color: white;
}
</style>
