import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import {
  getCategories as getCategoriesStrapi,
  getItems as getItemsStrapi,
} from "./strapi";
import {
  getCategories as getCategoriesSanity,
  getItems as getItemsSanity,
} from "./sanity";

export type BasicData = {
  categoryData: Category[];
  itemData: Item[];
};

export const getBasicData = async (): Promise<BasicData> => {
  if (import.meta.env.VITE_BE_SERVER === "STRAPI") {
    const categoryData = await getCategoriesStrapi();
    const itemData = await getItemsStrapi();
    return { categoryData, itemData };
  }

  if (import.meta.env.VITE_BE_SERVER === "SANITY") {
    const categoryData = await getCategoriesSanity();
    const itemData = await getItemsSanity();
    return { categoryData, itemData };
  }

  throw new Error("Matching VITE_BE_SERVER env variable not found");
};
