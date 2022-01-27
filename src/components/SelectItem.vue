<template>
  <div class="container">
    <div v-if="category" class="category-title">
      Select Item: {{ category }}
    </div>
    <div v-else class="category-title">Category not found</div>
    <SelectOption
      :options="itemOptions"
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
import NavButton from "../common/NavButton.vue";
import { useRoute } from "vue-router";
import { useStore } from "../store";

export default defineComponent({
  name: "SelectItem",
  components: { SelectOption, NavButton },
  setup() {
    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.state.categories.categories);
    const matchedCategory = computed(() =>
      categories.value.find(
        (category) => category.categoryId === route.params.categoryId
      )
    );

    const category = computed(() => matchedCategory.value?.categoryName);
    const items = computed(() => {
      return store.state.items.items.filter(
        (item) => item.categoryId === route.params.categoryId
      );
    });
    const itemOptions = computed(() => {
      return items.value.map((item) => {
        return {
          id: item.itemId,
          value: item.itemName,
          thumbnailURL: "/images/" + item.imageId,
        };
      });
    });
    return {
      category,
      itemOptions,
    };
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
