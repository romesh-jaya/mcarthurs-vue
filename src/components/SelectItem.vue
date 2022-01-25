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
import { defineComponent, computed } from "vue";
import SelectOption from "./SelectOption.vue";
import itemData from "../sampleData/items.json";
import NavButton from "../common/NavButton.vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";

export default defineComponent({
  name: "SelectItem",
  components: { SelectOption, NavButton },
  setup() {
    const store = useStore();
    const route = useRoute();

    const categories = store.state.categories.categories;
    const matchedCategory = categories.find(
      (category) => category.categoryId === route.params.categoryId
    );

    const category = computed(() => matchedCategory?.categoryName);
    const categoryId = computed(() => matchedCategory?.categoryId);
    const items = computed(() => {
      return itemData.items.filter(
        (item) => item.categoryId === route.params.categoryId
      );
    });
    return { category, categoryId, items };
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
