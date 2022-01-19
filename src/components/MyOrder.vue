<template>
  <div class="container">
    <div class="category-title">My Order</div>
    <div class="order-items" v-if="orderItems.length">
      <div class="order-item header">
        <div>Item</div>
        <div>Price (Rs)</div>
      </div>
      <div v-for="item in orderItems" :key="item.itemId" class="order-item">
        <div>{{ item.itemName }} - {{ item.quantity }}Nos</div>
        <div>{{ item.total.toFixed(2) }}</div>
      </div>
    </div>
    <div class="navbar-bottom">
      <NavButton @on-click="onBackClicked">BACK</NavButton>
      <NavButton @on-click="onAddAnotherClicked">ADD ANOTHER ITEM</NavButton>
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
    onBackClicked() {
      this.$router.push("/");
    },
    onAddAnotherClicked() {
      this.$router.push("/select-category");
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
</style>
