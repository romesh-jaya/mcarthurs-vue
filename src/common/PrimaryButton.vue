<template>
  <Button
    class="primary-button"
    :button-type="buttonType"
    :disabled="disabled"
    :center-content="centerContent"
    @on-click="$emit('on-click')"
  >
    <slot></slot>
  </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./Button.vue";

export default defineComponent({
  name: "PrimaryButton",
  components: { Button },
  props: {
    buttonType: { default: "button", type: String },
    disabled: Boolean,
    centerContent: Boolean,
  },
  emits: ["on-click"],
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";

.primary-button {
  font-size: 1.75rem !important;
  padding-inline: 3rem !important;
  padding-block: 1rem !important;
  border-radius: 1rem !important;
  background-color: $text-color;
  color: white;
}
</style>
