import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import {
  getCategories as getCategoriesStrapi,
  getItems as getItemsStrapi,
} from "./strapi";

export type BasicData = {
  categoryData: Category[];
  itemData: Item[];
};

export const getBasicData = async (): Promise<BasicData> => {
  if (import.meta.env.VITE_BE_URL === "STRAPI") {
    const categoryData = await getCategoriesStrapi();
    const itemData = await getItemsStrapi();
    return { categoryData, itemData };
  }

  return { categoryData: [], itemData: [] };
};
