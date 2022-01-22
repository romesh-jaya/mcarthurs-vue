<template>
  <div class="container">
    <div v-if="category" class="category-title">
      Select Item: {{ category }}
    </div>
    <div v-else class="category-title">Category not found</div>
    <SelectOption
      :options="items"
      class="select-categories"
      @option-clicked="onItemClicked"
    />
    <div class="navbar-bottom">
      <NavButton @on-click="onBackClicked">BACK</NavButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import categoryData from "../sampleData/categories.json";
import itemData from "../sampleData/items.json";
import NavButton from "../common/NavButton.vue";

export default defineComponent({
  name: "SelectItem",
  components: { SelectOption, NavButton },
  data() {
    return {};
  },
  computed: {
    category() {
      return categoryData.categories.find(
        (category) => category.id === this.$route.params.categoryId
      )?.value;
    },
    categoryId() {
      return categoryData.categories.find(
        (category) => category.id === this.$route.params.categoryId
      )?.id;
    },
    items() {
      return itemData.items.filter(
        (item) => item.categoryId === this.$route.params.categoryId
      );
    },
  },
  methods: {
    onBackClicked() {
      this.$router.push("/select-category");
    },
    onItemClicked(itemId: string) {
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

.select-categories {
  flex: 1 0px;
}
</style>
