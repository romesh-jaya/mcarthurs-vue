<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle" class="modal-header">
          <slot name="header"> This is the default title! </slot>
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            @click="close(false)"
          >
            x
          </button>
        </header>

        <section id="modalDescription" class="modal-body">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <NavButton
            v-if="buttonsToShow == buttonTypes.YesNo"
            class="btn-yes"
            @on-click="close(true)"
            >Yes</NavButton
          >
          <NavButton class="btn-no" @on-click="close">{{
            buttonsToShow === buttonTypes.YesNo ? "No" : "OK"
          }}</NavButton>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavButton from "../common/NavButton.vue";
import { ButtonTypes } from "../enums/ButtonTypes";

export default defineComponent({
  name: "Modal",
  components: { NavButton },
  props: {
    buttonsToShow: {
      type: String,
      default: ButtonTypes.Ok,
    },
  },
  emits: ["modal-close"],
  computed: {
    buttonTypes: () => ButtonTypes,
  },
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
  padding: 2rem;
  display: flex;
}

.modal-header {
  font-size: 2rem;
  font-weight: 900;
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
  font-size: 1.75rem;
  padding: 2rem;
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
  background: $nav-button-color;
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
