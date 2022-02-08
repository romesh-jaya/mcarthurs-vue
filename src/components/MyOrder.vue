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
      <div class="order-item total">
        <div>Total</div>
        <div>{{ orderTotal.toFixed(2) }}</div>
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
          Thank you for ordering! Your Order No:
          <!-- Note: only last 2 digits are required to be shown as the volume of order won't be that great -->
          {{ orderId.toString().slice(-2) }}
        </p>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../store";
import NavButton from "../common/NavButton.vue";
import Modal from "../common/Modal.vue";
import { ButtonTypes } from "../enums/ButtonTypes";
import { saveOrder } from "../api/strapi";
import { showErrorToast } from "../utils/toaster";

export default defineComponent({
  name: "MyOrder",
  components: { NavButton, Modal },
  setup() {
    const store = useStore();
    const showCancelOrderModal = ref(false);
    const showSubmitOrderModal = ref(false);
    const showSubmittedOrderModal = ref(false);
    const orderTotal = computed(() =>
      store.state.order.orderItems
        .map((item) => item.total)
        .reduce((partialSum, a) => partialSum + a, 0)
    );

    return {
      showCancelOrderModal,
      showSubmitOrderModal,
      showSubmittedOrderModal,
      orderItems: store.state.order.orderItems,
      buttonTypes: ButtonTypes,
      orderTotal,
    };
  },
  data() {
    return { orderId: -1 };
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

      const submitToBackend = async () => {
        const data = {
          orderDetails: JSON.stringify(this.orderItems),
          kioskId: this.$store.state.auth.kioskId,
        };
        try {
          const orderId = await saveOrder(data);
          this.orderId = orderId;
          this.showSubmittedOrderModal = true;
        } catch {
          showErrorToast("Error in submitting order!");
        }
      };

      if (retVal) {
        submitToBackend();
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
  display: flex;
  flex-direction: column;
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

.header,
.total {
  font-weight: 900;
}

.total {
  flex: 1 0px;
  align-items: flex-end;
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
