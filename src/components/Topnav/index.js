import React from "react";

const TopNav = () => {
  return (
    <nav className="bg-slate-700 shadow-md sticky top-0 z-50 mb-10">
      <div className="flex justify-center items-center h-16">
        <h1 className="text-xl font-semibold text-gray-100 uppercase tracking-widest">
          Fishing Journal
        </h1>
      </div>
    </nav>
  );
};

export default TopNav;
