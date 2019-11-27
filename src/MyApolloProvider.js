import React from "react";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import App from "./App";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { CtxtProvider } from "./Context";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
      console.error(locations);
    });

  if (networkError) console.log(`[Network ERORR]: ${networkError}`);
});

const httpLink = createHttpLink({
  // Graphcms.com Momen's Facebook Login
  // uri: "http://localhost:4000/"
  // uri: "https://api-euwest.graphcms.com/v1/ck1tco1yq29vq01cb5xmsgpds/master"
  uri: "https://accoose.herokuapp.com/"
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

function customeClientQuery(query, variables) {
  return new Promise((resolve, reject) => {
    client
      .query({
        query: query,
        variables: variables
      })
      .then(data => resolve(data.data))
      .catch(error => reject(error));
  });
}

const callClient = async (query, variables) => {
  return await customeClientQuery(query, variables);
};

const MyApolloProvider = () => (
  <ApolloProvider client={client}>
    <CtxtProvider>
      <App />
    </CtxtProvider>
  </ApolloProvider>
);

export { callClient, MyApolloProvider };
