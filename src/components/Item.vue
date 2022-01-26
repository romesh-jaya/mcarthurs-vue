<template>
  <div class="container">
    <div v-if="itemId" class="category-title">
      {{ item?.itemName }}
    </div>
    <div v-else class="category-title">Item not found</div>
    <div v-if="itemId" class="content">
      <div class="image-div">
        <img :src="imageURL" class="item-image" />
      </div>
      <div class="description">{{ item?.description }}</div>
      <div class="quantity">
        <Button class="button-change-quantity" @on-click="onReducedQuantity"
          >-</Button
        >
        Quantity: {{ quantity }}
        <Button class="button-change-quantity" @on-click="quantity++">+</Button>
      </div>
    </div>
    <div class="navbar-bottom">
      <NavButton @on-click="onBackClicked">BACK</NavButton>
      <NavButton
        v-if="initialQuantity === 0"
        :disabled="quantity === 0"
        @on-click="onAddSaveToOrder"
        >ADD TO ORDER</NavButton
      >
      <NavButton
        v-else
        :disabled="quantity === initialQuantity"
        @on-click="onAddSaveToOrder"
        >SAVE CHANGES</NavButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import NavButton from "../common/NavButton.vue";
import Button from "../common/Button.vue";
import { useStore } from "../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Item",
  components: { NavButton, Button },
  setup() {
    const route = useRoute();
    const store = useStore();
    const quantity = ref(0);
    const initialQuantity = ref(0); // quantity retrieved from store when page loads

    const matchedItem = store.state.items.items.find(
      (item) => item.itemId === route.params.itemId
    );
    const matchedItemId = matchedItem?.itemId;

    const initializeQuantities = () => {
      quantity.value = matchedItemId
        ? store.getters["order/getOrderItemQuantity"](matchedItemId)
        : 0;
      initialQuantity.value = quantity.value;
    };

    onMounted(initializeQuantities);

    return {
      quantity,
      initialQuantity,
      item: matchedItem,
      itemId: matchedItemId,
      imageURL: "/images/" + matchedItem?.imageId,
    };
  },
  methods: {
    onBackClicked() {
      if (this.item) {
        this.$router.push("/select-item/" + this.item.categoryId);
        return;
      }
      this.$router.push("/select-category");
    },
    onReducedQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    onAddSaveToOrder() {
      if (this.item) {
        const itemData = {
          itemId: this.item.itemId,
          quantity: this.quantity,
          total: this.item.price * this.quantity,
          itemName: this.item.itemName,
        };

        if (this.initialQuantity === 0) {
          this.$store.commit("order/addOrderItem", itemData);
        } else {
          this.$store.commit("order/saveOrderItem", itemData);
        }
        this.$router.push("/my-order");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/globals.scss";
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.select-categories {
  flex: 1 0px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0px;
}

.image-div {
  margin-block-end: 3rem;
  height: 20rem;
}

.item-image {
  height: 100%;
  width: 80%;
  object-fit: cover;
  border-radius: 2rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.description {
  font-size: 1.5rem;
  font-weight: normal;
}

.quantity {
  margin-block: 2rem;
  font-size: 1.75rem;
  font-weight: normal;
}

.button-change-quantity {
  font-size: 2.5rem;
  margin-inline: 2rem;
  height: 4rem;
  width: 4rem;
  border-radius: 1rem;
  background-color: $text-color;
  color: white;
}
</style>
