import axios, { AxiosInstance } from "axios";

const bEServerType = import.meta.env.VITE_BE_SERVER;

const baseURL =
  (bEServerType === "STRAPI" && import.meta.env.VITE_BE_URL_STRAPI) ||
  (bEServerType === "SANITY" && import.meta.env.VITE_BE_URL_SANITY) ||
  (bEServerType === "GRAPHCMS" && import.meta.env.VITE_NODE_URL) ||
  "";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
