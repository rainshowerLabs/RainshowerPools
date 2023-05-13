import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">RainShower</h1>
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="#" className="hover:text-blue-300">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
