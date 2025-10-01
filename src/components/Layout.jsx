import React from "react";
import Nav from "./Nav";

function Layout({ children }) {
  return (
    <div className="relative min-h-screen  bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Fixed Nav */}
      <div className="w-full h-[150px] z-50 top-0 md:top-0 md:bottom-auto">
        <Nav />
      </div>

      {/* Space between nav and content */}
      <div className="pt-[70px] pb-[70px] overflow-auto h-full">
        {children}
      </div>
    </div>
  );
}

export default Layout;
