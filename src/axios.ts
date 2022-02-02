import axios, { AxiosInstance } from "axios";

const bEServerType = import.meta.env.VITE_BE_SERVER;

const apiClient: AxiosInstance = axios.create({
  baseURL:
    bEServerType === "STRAPI"
      ? import.meta.env.VITE_BE_URL_STRAPI
      : import.meta.env.VITE_BE_URL_SANITY,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
