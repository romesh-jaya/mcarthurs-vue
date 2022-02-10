import axios, { AxiosInstance } from "axios";
import { store } from "./store";

const bEServerType = import.meta.env.VITE_BE_SERVER;

// Note: The Sanity and GraphCMS servers are interfaced via a NodeJS middleware,
// which is used to hide the sensitive API keys for Sanity and GraphCMS.
const baseURL =
  (bEServerType === "STRAPI" && import.meta.env.VITE_BE_URL_STRAPI) ||
  (bEServerType === "SANITY" && import.meta.env.VITE_NODE_URL) ||
  (bEServerType === "GRAPHCMS" && import.meta.env.VITE_NODE_URL) ||
  "";

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(function (config) {
  const authToken = store.state.auth.user?.jwt;

  if (authToken && config.headers) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default apiClient;
