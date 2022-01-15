<template>
  <Button class="nav-button" @on-click="$emit('on-click')">
    <slot></slot>
  </Button>
</template>
<script lang="">
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "NavButton",
  components: { Button },
  emits: ["on-click"],
});
</script>

<style lang="scss">
@import "../styles/globals.scss";

.nav-button {
  font-size: 1.5rem;
  padding-inline: 3rem;
  padding-block: 1rem;
  border-radius: 1rem;
  background-color: $nav-button-color;
  color: white;
}
</style>
