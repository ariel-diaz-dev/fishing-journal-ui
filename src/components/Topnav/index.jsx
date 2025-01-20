import React from "react";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="bg-slate-700 shadow-md sticky top-0 z-50 mb-10">
      <div className="flex justify-center items-center h-16">
        <NavLink to={"/"}>
          <h1 className="text-xl font-semibold text-gray-100 uppercase tracking-widest">
            Fishing Journal
          </h1>
        </NavLink>
      </div>
    </nav>
  );
};

export default TopNav;
