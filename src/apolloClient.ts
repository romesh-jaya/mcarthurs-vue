import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client/core";
import { store } from "./store";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BE_URL_GRAPHCMS,
});

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    const authToken = store.state.auth.user?.jwt;
    operation.setContext(({ headers }: { headers: Headers }) => ({
      headers: {
        ...headers,
        ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      },
    }));
    // Go to the next link in the chain. Similar to `next` in Express.js middleware.
    return forward(operation);
  }),
  httpLink,
]);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: additiveLink,
  cache,
});
