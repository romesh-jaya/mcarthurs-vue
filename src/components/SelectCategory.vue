<template>
  <div class="container">
    <div class="category-title">Select Category</div>
    <SelectOption :options="categories" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SelectOption from "./SelectOption.vue";
import categoryData from "../sampleData/categories.json";

export default defineComponent({
  name: "SelectCategory",
  components: { SelectOption },
  data() {
    return {
      categories: categoryData.categories,
    };
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
</style>
