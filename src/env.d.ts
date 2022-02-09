/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BE_URL_STRAPI: string;
  readonly VITE_BE_URL_SANITY: string;
  readonly VITE_BE_URL_GRAPHCMS: string;
  readonly VITE_BE_SERVER: string;
  readonly VITE_SANITY_TOKEN: string;
  readonly VITE_GRAPHCMS_TOKEN: string;
  readonly VITE_NODE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
