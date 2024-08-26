import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className=" pb-10 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
