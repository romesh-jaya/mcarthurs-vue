<template>
  <div class="container">
    <div class="category-title">Select Category</div>
    <SelectOption
      :options="categories"
      class="select-categories"
      @option-clicked="onCategoryClicked"
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
import NavButton from "../common/NavButton.vue";

export default defineComponent({
  name: "SelectCategory",
  components: { SelectOption, NavButton },
  data() {
    return {
      categories: categoryData.categories,
    };
  },
  methods: {
    onBackClicked() {
      this.$router.push("/my-order");
    },
    onCategoryClicked(categoryId: string) {
      this.$router.push("/select-item/" + categoryId);
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
