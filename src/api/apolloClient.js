import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// GraphQL API endpoint - replace with your actual backend URL
const API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({
  uri: API_URL,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
