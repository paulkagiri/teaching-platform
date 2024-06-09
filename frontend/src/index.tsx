import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./styles.css";

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI, // Use environment variable
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
