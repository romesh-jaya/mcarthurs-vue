<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import { useQuery } from "@vue/apollo-composable";
import { getBasicData } from "./api";
import { getCategories, getItems } from "./queries";
import { useStore } from "./store";
import { Category } from "./types/Category";
import { Item } from "./types/Item";

const bEServerType = import.meta.env.VITE_BE_SERVER;

const toaster = createToaster({
  position: "top-right",
  duration: 6000,
});

export default defineComponent({
  name: "App",
  setup() {
    // By default, enabledGraphCMS=false. Only enable it if GraphCMS is the chosen CMS in .env
    const enabledGraphCMS = ref(false);
    const { result: categoriesResult, error: categoriesError } = useQuery(
      getCategories,
      null,
      () => ({
        enabled: enabledGraphCMS.value,
      })
    );
    const { result: itemsResult, error: itemsError } = useQuery(
      getItems,
      null,
      () => ({
        enabled: enabledGraphCMS.value,
      })
    );
    const store = useStore();

    const fetchBasicDataStrapiSanity = async () => {
      try {
        const { categoryData, itemData } = await getBasicData();

        store.commit("categories/saveCategories", categoryData);
        store.commit("items/saveItems", itemData);
      } catch {
        toaster.error("Error in accessing backend server!");
      }
    };

    // Fetch data
    if (bEServerType === "STRAPI" || bEServerType === "SANITY") {
      fetchBasicDataStrapiSanity();
    } else if (bEServerType === "GRAPHCMS") {
      enabledGraphCMS.value = true;
    } else {
      throw new Error("Matching VITE_BE_SERVER env variable not found");
    }

    // watchers to store GraphCMS results
    watch(itemsResult, () => {
      const response = itemsResult.value;
      if (response) {
        const itemData: Item[] = response.items.map((item: any) => {
          return {
            itemId: item.itemId,
            itemName: item.itemName,
            imageURL: item.image.url,
            thumbnailURL: item.image.url,
            categoryId: item.category.categoryId,
            description: item.description,
            price: item.price,
          };
        });
        store.commit("items/saveItems", itemData);
      }
    });

    watch(categoriesResult, () => {
      const response = categoriesResult.value;
      if (response) {
        const categoryData: Category[] = response.categories.map(
          (category: any) => {
            return {
              categoryId: category.categoryId,
              categoryName: category.categoryName,
              thumbnailURL: category.image.url,
            };
          }
        );

        store.commit("categories/saveCategories", categoryData);
      }
    });

    // Error handling for GraphCMS
    watch(categoriesError, () => {
      if (categoriesError.value) {
        toaster.error("Error in accessing backend server!");
      }
    });

    watch(itemsError, () => {
      if (itemsError.value) {
        toaster.error("Error in accessing backend server!");
      }
    });
  },
});
</script>

<style lang="scss">
@import "./styles/globals.scss";
@import url("https://fonts.googleapis.com/css?family=Nunito");

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Nunito";
  height: 100%;
  color: $text-color;
  font-size: 1rem;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: "Nunito";
}

* {
  box-sizing: border-box;
}

p {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-block-start: 60px;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
}

/* Common styles for components */
.category-title {
  margin-block: 2rem;
  font-size: 2rem;
  font-weight: 900;
}

.navbar-bottom {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}

/* This is for the toast notifications */
.c-toast {
  font-family: "Nunito" !important;
}
</style>
