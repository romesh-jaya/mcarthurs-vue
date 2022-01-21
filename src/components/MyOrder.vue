<template>
  <div class="container">
    <div class="category-title">My Order</div>
    <div class="order-items" v-if="orderItems.length > 0">
      <div class="order-item header">
        <div>Item</div>
        <div>Price (Rs)</div>
      </div>
      <div v-for="item in orderItems" :key="item.itemId" class="order-item">
        <div>
          {{ item.itemName }} - {{ item.quantity }}Nos
          <span
            class="edit-icon-container"
            @click="onEditItemClicked(item.itemId)"
          >
            <font-awesome-icon class="edit-icon" :icon="['fas', 'edit']" />
            <font-awesome-icon class="edit-icon" :icon="['far', 'edit']" />
          </span>
        </div>
        <div>{{ item.total.toFixed(2) }}</div>
      </div>
    </div>
    <div class="order-items" v-else>No items are currently in your order</div>
    <div class="navbar-bottom">
      <NavButton @on-click="onCancelOrderClicked">CANCEL ORDER</NavButton>
      <NavButton
        @on-click="onSubmitOrderClicked"
        :disabled="orderItems.length === 0"
        >SUBMIT ORDER</NavButton
      >
      <NavButton @on-click="onAddAnotherClicked">{{
        orderItems.length > 0 ? "ADD ANOTHER ITEM" : "ADD ITEM"
      }}</NavButton>
    </div>
    <Modal
      v-if="showCancelOrderModal"
      @modal-close="onModalClosedCancel"
      :buttonsToShow="buttonTypes.YesNo"
    >
      <template v-slot:header>
        <p>Cancel order</p>
      </template>
      <template v-slot:body>
        <p>Are you sure you wish to cancel this order?</p>
      </template>
    </Modal>
    <Modal
      v-if="showSubmitOrderModal"
      @modal-close="onModalClosedSubmit"
      :buttonsToShow="buttonTypes.YesNo"
    >
      <template v-slot:header>
        <p>Submit order</p>
      </template>
      <template v-slot:body>
        <p>Are you sure you wish to submit this order to the kitchen?</p>
      </template>
    </Modal>
    <Modal v-if="showSubmittedOrderModal" @modal-close="onModalClosedSubmitted">
      <template v-slot:header>
        <p>Order Submitted</p>
      </template>
      <template v-slot:body>
        <p>
          Your order has been submitted! Order No:
          {{ Math.floor(Math.random() * 100) }}
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import NavButton from "../common/NavButton.vue";
import Modal from "../common/Modal.vue";
import { ButtonTypes } from "../enums/ButtonTypes";

export default defineComponent({
  name: "MyOrder",
  components: { SelectOption, NavButton, Modal },
  data() {
    return {
      showCancelOrderModal: false,
      showSubmitOrderModal: false,
      showSubmittedOrderModal: false,
    };
  },
  computed: {
    orderItems() {
      return this.$store.state.orderItems;
    },
    buttonTypes: () => ButtonTypes,
  },
  methods: {
    onCancelOrderClicked() {
      if (this.orderItems.length === 0) {
        this.$store.commit("clearAllItems");
        this.$router.push("/");
        return;
      }
      this.showCancelOrderModal = true;
    },
    onSubmitOrderClicked() {
      this.showSubmitOrderModal = true;
    },
    onAddAnotherClicked() {
      this.$router.push("/select-category");
    },
    onEditItemClicked(itemId: string) {
      this.$router.push("/items/" + itemId);
    },
    onModalClosedCancel(value: { retVal: boolean }) {
      const { retVal } = value;
      this.showCancelOrderModal = false;
      if (retVal) {
        this.$store.commit("clearAllItems");
        this.$router.push("/");
      }
    },
    onModalClosedSubmit(value: { retVal: boolean }) {
      const { retVal } = value;
      this.showSubmitOrderModal = false;
      if (retVal) {
        this.showSubmittedOrderModal = true;
      }
    },
    onModalClosedSubmitted() {
      this.showSubmittedOrderModal = false;
      this.$store.commit("clearAllItems");
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.order-items {
  text-align: left;
  flex: 1 0px;
  padding-inline: 4rem;
  font-size: 1.75rem;
}

.order-item {
  margin-block-end: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.header {
  font-weight: 900;
}

.edit-icon-container {
  margin-inline-start: 1rem;
}

.edit-icon:first-child {
  display: none;
}

.edit-icon-container:active {
  .edit-icon:first-child {
    display: inherit;
  }
  .edit-icon:nth-child(2) {
    display: none;
  }
}
</style>
