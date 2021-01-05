import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { cache } from "./cache";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.css';

const client = new ApolloClient({
  cache,
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
reportWebVitals();
