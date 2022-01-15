<template>
  <div class="container">
    <div v-if="category" class="category-title">
      Select Item: {{ category }}
    </div>
    <div v-if="!category" class="category-title">Category not found</div>
    <SelectOption :options="items" class="select-categories" />
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
  methods: {
    onBackClicked() {
      this.$router.push("/select-category");
    },
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
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category-title {
  margin-block: 2rem;
  font-size: 2rem;
  font-weight: 900;
}

.select-categories {
  flex: 1 0px;
}

.navbar-bottom {
  padding: 3rem;
  text-align: left;
}
</style>
