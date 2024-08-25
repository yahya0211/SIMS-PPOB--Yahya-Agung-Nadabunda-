import React from "react";
import { NAV_ITEM } from "./NAV_ITEM";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex px-16 py-5 justify-between shadow-lg">
      <div className="flex gap-2  items-center justify-center">
        <div className="flex flex-col items-center justify-center  gap-8">
          <Link to="/">
            <h1 className="flex items-center justify-center text-xl font-semibold gap-2 uppercase">
              <img src="./Logo.png" alt="logo-simps" />
              sims ppob
            </h1>
          </Link>
        </div>
      </div>
      <ul className="flex gap-20 font-semibold">
        {NAV_ITEM.map((item, index) => (
          <li key={index} className="capitalize">
            <NavLink to={item.path} className={({ isActive }) => (isActive ? "text-red-500 decoration-2" : "hover:text-red-500 active:text-red-500 focus:text-red-500 focus:decoration-2")}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
