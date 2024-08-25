import React from "react";
import { RouteObject } from "react-router-dom";
import { RegisterPage } from "../pages/auth/Register/register";
import { Login } from "../pages/auth/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import { authRoutes } from "./navbarRoute";
import PrivateRoute from "./privateRoute";

const router: RouteObject[] = [
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <PrivateRoute element={<HomePage />} />,
    children: authRoutes,
  },
];

export default router;
