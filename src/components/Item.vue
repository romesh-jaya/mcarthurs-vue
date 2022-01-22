<template>
  <div class="container">
    <div v-if="itemId" class="category-title">
      {{ item.value }}
    </div>
    <div v-else class="category-title">Item not found</div>
    <div v-if="itemId" class="content">
      <div class="image-div">
        <img :src="item.thumbnailURL" class="item-image" />
      </div>
      <div class="description">{{ item.description }}</div>
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
import { defineComponent } from "vue";
import itemData from "../sampleData/items.json";
import NavButton from "../common/NavButton.vue";
import Button from "../common/Button.vue";

export default defineComponent({
  name: "Item",
  components: { NavButton, Button },
  data() {
    return {
      quantity: 0,
      initialQuantity: 0, // quantity retrieved from store when page loads
    };
  },
  computed: {
    item() {
      return itemData.items.find(
        (items) => items.id === this.$route.params.itemId
      );
    },
    itemId(): string | undefined {
      return itemData.items.find(
        (items) => items.id === this.$route.params.itemId
      )?.id;
    },
  },
  mounted() {
    this.quantity = this.itemId
      ? this.$store.getters.getOrderItemQuantity(this.itemId)
      : 0;
    this.initialQuantity = this.quantity;
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
          itemId: this.item.id,
          quantity: this.quantity,
          total: this.item.price * this.quantity,
          itemName: this.item.value,
        };

        if (this.initialQuantity === 0) {
          this.$store.commit("addOrderItem", itemData);
        } else {
          this.$store.commit("saveOrderItem", itemData);
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
