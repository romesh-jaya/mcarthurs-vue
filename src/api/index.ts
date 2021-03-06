import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import {
  getCategories as getCategoriesStrapi,
  getItems as getItemsStrapi,
  login as loginStrapi,
  saveOrder as saveOrderStrapi,
} from "./strapi";
import {
  getCategories as getCategoriesSanity,
  getItems as getItemsSanity,
  saveOrder as saveOrderSanity,
} from "./sanity";
import { login as loginNodeJS } from "./nodejs";
import { AuthInfo } from "@/types/AuthInfo";
import { OrderInfo } from "@/types/OrderInfo";

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

export const login = async (
  email: string,
  password: string
): Promise<AuthInfo> => {
  if (import.meta.env.VITE_BE_SERVER === "STRAPI") {
    return await loginStrapi(email, password);
  }

  if (
    import.meta.env.VITE_BE_SERVER === "SANITY" ||
    import.meta.env.VITE_BE_SERVER === "GRAPHCMS"
  ) {
    return await loginNodeJS(email, password);
  }

  throw new Error("Matching VITE_BE_SERVER env variable not found");
};

export const saveOrder = async (data: OrderInfo): Promise<number> => {
  if (import.meta.env.VITE_BE_SERVER === "STRAPI") {
    return await saveOrderStrapi(data);
  }

  if (import.meta.env.VITE_BE_SERVER === "SANITY") {
    return await saveOrderSanity(data);
  }

  throw new Error("Matching VITE_BE_SERVER env variable not found");
};
