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
        :disabled="orderItems.length === 0 || savingDataInProgress"
        center-content
        @on-click="onSubmitOrderClicked"
        ><Spinner v-if="savingDataInProgress" class="spinner" />SUBMIT
        ORDER</NavButton
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
import { useMutation } from "@vue/apollo-composable";
import { useStore } from "../store";
import NavButton from "../common/NavButton.vue";
import Modal from "../common/Modal.vue";
import { ButtonTypes } from "../enums/ButtonTypes";
import { saveOrder } from "../api";
import { showErrorToast } from "../utils/toaster";
import { createOrder } from "../queries";
import Spinner from "../common/Spinner.vue";

const bEServerType = import.meta.env.VITE_BE_SERVER;
const errorSubmitOrder = "Error in submitting order! Please contact desk";

export default defineComponent({
  name: "MyOrder",
  components: { NavButton, Modal, Spinner },
  setup() {
    const store = useStore();
    const {
      mutate: createOrderExec,
      onError: onCreateOrderError,
      onDone: onCreateOrderDone,
    } = useMutation(createOrder);

    const savingDataInProgress = ref(false);
    const orderId = ref(-1);
    const showCancelOrderModal = ref(false);
    const showSubmitOrderModal = ref(false);
    const showSubmittedOrderModal = ref(false);
    const orderTotal = computed(() =>
      store.state.order.orderItems
        .map((item) => item.total)
        .reduce((partialSum, a) => partialSum + a, 0)
    );

    onCreateOrderError(() => {
      showErrorToast(errorSubmitOrder);
      savingDataInProgress.value = false;
    });

    onCreateOrderDone(() => {
      // Note: in GRAPHCMS, there is no way to find out the last Order ID without race conditions
      // Therefore we are simply hard-coding the orderId as 1
      orderId.value = 1;
      savingDataInProgress.value = false;
      showSubmittedOrderModal.value = true;
    });

    return {
      showCancelOrderModal,
      showSubmitOrderModal,
      showSubmittedOrderModal,
      orderItems: store.state.order.orderItems,
      buttonTypes: ButtonTypes,
      orderTotal,
      createOrderExec,
      orderId,
      savingDataInProgress,
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
      const data = {
        orderDetails: JSON.stringify(this.orderItems),
        kioskId: this.$store.state.auth.kioskId,
      };

      const submitToBackendSanityStrapi = async () => {
        try {
          const orderId = await saveOrder(data);
          this.orderId = orderId;
          this.showSubmittedOrderModal = true;
        } catch {
          showErrorToast(errorSubmitOrder);
        } finally {
          this.savingDataInProgress = false;
        }
      };

      if (retVal) {
        this.savingDataInProgress = true;
        if (bEServerType === "STRAPI" || bEServerType === "SANITY") {
          submitToBackendSanityStrapi();
          return;
        }
        this.createOrderExec({
          data,
        });
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

.spinner {
  margin-inline-end: 1rem;
}
</style>
