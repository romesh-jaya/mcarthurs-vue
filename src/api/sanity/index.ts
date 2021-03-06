import axios from "../../axios";
import { Category } from "@/types/Category";
import { Item } from "@/types/Item";
import { store } from "../../store";
import { OrderInfo } from "@/types/OrderInfo";

// Note: the long query is because it is a GROQ query, converted into URL
export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(
    "/api/sanity?query=*%5B_type%20%3D%3D%20'category'%5D%7B%0A%20%20categoryId%2C%0A%20%20categoryName%2C%0A%20%20%22imageUrl%22%3A%20image.asset-%3Eurl%2C%0A%7D"
  );
  const categoryData: Category[] = response.data.result.map((category: any) => {
    return {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      thumbnailURL: category.imageUrl,
    };
  });
  return categoryData;
};

export const getItems = async (): Promise<Item[]> => {
  const response = await axios.get(
    "/api/sanity?query=*%5B_type%20%3D%3D%20'item'%5D%7B%0A%20%20itemId%2C%0A%20%20itemName%2C%0A%20%20price%2C%0A%20%20description%2C%0A%20%20%22imageUrl%22%3A%20image.asset-%3Eurl%2C%0A%20%20category-%3E%7BcategoryId%7D%0A%7D"
  );
  const itemData: Item[] = response.data.result.map((item: any) => {
    return {
      itemId: item.itemId,
      itemName: item.itemName,
      imageURL: item.imageUrl,
      thumbnailURL: item.imageUrl,
      categoryId: item.category.categoryId,
      description: item.description,
      price: item.price,
    };
  });
  return itemData;
};

export const saveOrder = async (data: OrderInfo): Promise<number> => {
  const jwt = store.state.auth.user.jwt;

  const tempOrderId = 1;
  const sanityData = {
    mutations: [
      {
        create: {
          _type: "order",
          kioskId: data.kioskId,
          orderDetails: data.orderDetails,
        },
      },
    ],
  };
  await axios.post("/api/sanity", sanityData, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  // Note: in Sanity, there is no way to find out the last Order ID without race conditions
  // Therefore we are simply hard-coding the orderId as 1
  // ref: https://stackoverflow.com/questions/50154648/how-to-increment-property-per-document-in-sanity
  return tempOrderId;
};
