import React from "react";
import { RouteObject } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Home from "../components/Home/Home";
import { featuresRoute } from "./featuresRoute";

export const authRoutes: RouteObject[] = [
  {
    path: "/account",
    element: <ProfilePage />,
  },
  {
    path: "/",
    element: <Home />,
    children: featuresRoute,
  },
];
