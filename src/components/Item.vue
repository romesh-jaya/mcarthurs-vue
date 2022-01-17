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
    </div>
    <div class="navbar-bottom">
      <NavButton @on-click="onBackClicked">BACK</NavButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import itemData from "../sampleData/items.json";
import NavButton from "../common/NavButton.vue";

export default defineComponent({
  name: "Item",
  components: { SelectOption, NavButton },
  data() {
    return {};
  },
  methods: {
    onBackClicked() {
      if (this.item) {
        this.$router.push("/select-item/" + this.item.categoryId);
        return;
      }
      this.$router.push("/select-category");
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
  flex: 1 0px;
}

.image-div {
  margin-block: 3rem;
  height: 25rem;
}

.item-image {
  height: 100%;
  width: 80%;
  object-fit: cover;
  border-radius: 2rem;
}

.description {
  font-size: 1.5rem;
  font-weight: normal;
}
</style>
