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
      <NavButton @on-click="onBackClicked" :disabled="quantity === 0"
        >ADD TO ORDER</NavButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import itemData from "../sampleData/items.json";
import NavButton from "../common/NavButton.vue";
import Button from "../common/Button.vue";

export default defineComponent({
  name: "Item",
  components: { SelectOption, NavButton, Button },
  data() {
    return {
      quantity: 0,
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
  },
  computed: {
    item() {
      return itemData.items.find(
        (items) => items.id === this.$route.params.itemId
      );
    },
    itemId() {
      return itemData.items.find(
        (items) => items.id === this.$route.params.itemId
      )?.id;
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
