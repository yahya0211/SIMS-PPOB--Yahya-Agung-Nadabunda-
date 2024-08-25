import React from "react";
import { RouteObject } from "react-router-dom";
import TopUpPage from "../components/TopUpPage/TopUp";
import TransactionPage from "../components/TransactionPage/TransactionPage";
import HomeComponents from "../components/Home/HomeComponents";
import ServicePage from "../components/Home/ServicePage";

export const featuresRoute: RouteObject[] = [
  {
    path: "/top-up",
    element: <TopUpPage />,
  },
  {
    path: "/transaction",
    element: <TransactionPage />,
  },
  {
    path: "/",
    element: <HomeComponents />,
  },
  {
    path: "/services/:service_code",
    element: <ServicePage />,
  },
];
