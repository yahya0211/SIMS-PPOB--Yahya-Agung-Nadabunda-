import React from "react";
import { Outlet } from "react-router-dom";

import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <div className="py-10 px-24">
      <Dashboard />
      <Outlet />
    </div>
  );
};

export default Home;
