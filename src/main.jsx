import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes/Routes";
import ScrollToTop from "react-scroll-to-top";
import Authprovider from "./Provider/AuthProvider";
import DisableRightClick from "./Utils/DisableRightClick";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <DisableRightClick />
        <RouterProvider router={router} />
        <ScrollToTop
          smooth
          width="20px"
          height="20px"
          color="#ffffff"
          style={{ backgroundColor: "#D10002", padding: "11px 10px" }}
        />
      </QueryClientProvider>
    </Authprovider>
  </React.StrictMode>
);
