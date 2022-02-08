<template>
  <button
    class="button"
    :class="{ disabled: disabled, centerContent: centerContent }"
    :disabled="disabled"
    :type="buttonTypeComputed"
    @click="$emit('on-click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export type ButtonType = "button" | "submit" | "reset";

export default defineComponent({
  name: "Button",
  props: {
    disabled: Boolean,
    centerContent: Boolean,
    buttonType: {
      default: "button",
      type: String,
    },
  },
  emits: ["on-click"],
  setup(props) {
    const buttonTypeComputed = computed(() => props.buttonType as ButtonType);
    return {
      buttonTypeComputed,
    };
  },
});
</script>

<style>
.button {
  place-items: center;
  padding-inline: 0.5rem;
  padding-block: 0.25rem;
  border-radius: 3px;
  font-size: 1rem;
  border: 1px solid grey;
  cursor: pointer;
}

.center-content {
  display: flex;
}

.disabled {
  background-color: grey !important;
  cursor: inherit !important;
}
</style>
