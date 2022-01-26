<template>
  <div class="container">
    <div class="category-title">Select Category</div>
    <SelectOption
      :options="categoryOptions"
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
import NavButton from "../common/NavButton.vue";
import { useStore } from "../store";

export default defineComponent({
  name: "SelectCategory",
  components: { SelectOption, NavButton },
  setup() {
    const store = useStore();
    return {
      categoryOptions: store.state.categories.categories.map((category) => {
        return {
          id: category.categoryId,
          value: category.categoryName,
          thumbnailURL: category.imageURL,
        };
      }),
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
