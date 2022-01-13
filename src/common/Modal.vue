<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is the default tile! </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <Button class="btn-yes" @on-click="close(true)">Yes</Button>
          <Button class="btn-no" @on-click="close">No</Button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../common/Button.vue";

export default defineComponent({
  name: "Modal",
  emits: ["modal-close"],
  components: { Button },
  methods: {
    close(retVal: boolean) {
      this.$emit("modal-close", { retVal });
    },
  },
});
</script>

<style lang="scss">
@import "../styles/globals.scss";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  display: flex;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  background: transparent;
}

.btn-yes {
  color: white;
  background: red;
}

.btn-no {
  margin-inline-start: 0.5rem;
  color: white;
  background: $green;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
