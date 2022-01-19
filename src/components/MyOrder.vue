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
      <NavButton @on-click="onAddAnotherClicked">{{
        orderItems.length > 0 ? "ADD ANOTHER ITEM" : "ADD ITEM"
      }}</NavButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import NavButton from "../common/NavButton.vue";

export default defineComponent({
  name: "MyOrder",
  components: { SelectOption, NavButton },
  computed: {
    orderItems() {
      return this.$store.state.orderItems;
    },
  },
  methods: {
    onCancelOrderClicked() {
      this.$store.commit("clearAllItems");
      this.$router.push("/");
    },
    onAddAnotherClicked() {
      this.$router.push("/select-category");
    },
    onEditItemClicked(itemId: string) {
      this.$router.push("/items/" + itemId);
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
