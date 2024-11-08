import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.js';
import NorthStarThemeProvider from 'aws-northstar/components/NorthStarThemeProvider';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:3000/graphql"
});


ReactDOM.render(
    <React.StrictMode>
    <ApolloProvider client={client}>
      <NorthStarThemeProvider>
        <App />
      </NorthStarThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);