import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import { getCategories, getItems } from "./strapi";

export type BasicData = {
  categoryData: Category[];
  itemData: Item[];
};

export const getBasicData = async (): Promise<BasicData> => {
  const categoryData = await getCategories();
  const itemData = await getItems();

  return { categoryData, itemData };
};
