import axios from "../../axios";
import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import { AuthInfo } from "@/types/AuthInfo";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get("/api/categories?populate=*");
  const categoryData: Category[] = response.data.data.map((category: any) => {
    const isImageAvailable = !!category.attributes.image.data;
    return {
      categoryId: category.attributes.categoryId,
      categoryName: category.attributes.categoryName,
      thumbnailURL: isImageAvailable
        ? category.attributes.image.data.attributes.formats.thumbnail.url
        : "",
    };
  });
  return categoryData;
};

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get("/api/items?populate=*");
  const itemData: Item[] = response.data.data.map((item: any) => {
    const isImageAvailable = !!item.attributes.image.data;
    return {
      itemId: item.attributes.itemId,
      itemName: item.attributes.itemName,
      imageURL: isImageAvailable
        ? item.attributes.image.data.attributes.url
        : "",
      thumbnailURL: isImageAvailable
        ? item.attributes.image.data.attributes.formats.thumbnail.url
        : "",
      categoryId: item.attributes.category.data.attributes.categoryId,
      description: item.attributes.description,
      price: item.attributes.price,
    };
  });
  return itemData;
};

export const login = async (
  email: string,
  password: string
): Promise<AuthInfo> => {
  const { data } = await axios.post<AuthInfo>("/api/auth/local", {
    identifier: email,
    password: password,
  });

  return data;
};
