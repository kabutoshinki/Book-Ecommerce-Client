import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
