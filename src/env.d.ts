/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BE_URL_STRAPI: string;
  readonly VITE_BE_SERVER: string;
  readonly VITE_NODE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
