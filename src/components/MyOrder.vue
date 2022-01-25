<template>
  <div class="container">
    <div class="category-title">My Order</div>
    <div v-if="orderItems.length > 0" class="order-items">
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
    <div v-else class="order-items">No items are currently in your order</div>
    <div class="navbar-bottom">
      <NavButton @on-click="onCancelOrderClicked">CANCEL ORDER</NavButton>
      <NavButton
        :disabled="orderItems.length === 0"
        @on-click="onSubmitOrderClicked"
        >SUBMIT ORDER</NavButton
      >
      <NavButton @on-click="onAddAnotherClicked">{{
        orderItems.length > 0 ? "ADD ANOTHER ITEM" : "ADD ITEM"
      }}</NavButton>
    </div>
    <Modal
      v-if="showCancelOrderModal"
      :buttons-to-show="buttonTypes.YesNo"
      @modal-close="onModalClosedCancel"
    >
      <template #header>
        <p>Cancel order</p>
      </template>
      <template #body>
        <p>Are you sure you wish to cancel this order?</p>
      </template>
    </Modal>
    <Modal
      v-if="showSubmitOrderModal"
      :buttons-to-show="buttonTypes.YesNo"
      @modal-close="onModalClosedSubmit"
    >
      <template #header>
        <p>Submit order</p>
      </template>
      <template #body>
        <p>Are you sure you wish to submit this order to the kitchen?</p>
      </template>
    </Modal>
    <Modal v-if="showSubmittedOrderModal" @modal-close="onModalClosedSubmitted">
      <template #header>
        <p>Order Submitted</p>
      </template>
      <template #body>
        <p>
          Your order has been submitted! Order No:
          {{ Math.floor(Math.random() * 100) }}
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import NavButton from "../common/NavButton.vue";
import Modal from "../common/Modal.vue";
import { ButtonTypes } from "../enums/ButtonTypes";

export default defineComponent({
  name: "MyOrder",
  components: { NavButton, Modal },
  setup() {
    const store = useStore();
    const showCancelOrderModal = ref(false);
    const showSubmitOrderModal = ref(false);
    const showSubmittedOrderModal = ref(false);

    return {
      showCancelOrderModal,
      showSubmitOrderModal,
      showSubmittedOrderModal,
      orderItems: store.state.order.orderItems,
      buttonTypes: ButtonTypes,
    };
  },
  methods: {
    onCancelOrderClicked() {
      if (this.orderItems.length === 0) {
        this.$store.commit("order/clearAllItems");
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
        this.$store.commit("order/clearAllItems");
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
      this.$store.commit("order/clearAllItems");
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
