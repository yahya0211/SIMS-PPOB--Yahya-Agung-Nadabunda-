import { useState } from "react";
import React from "react";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router";

function App() {
  return <RouterProvider router={createBrowserRouter(router)} />;
}

export default App;
