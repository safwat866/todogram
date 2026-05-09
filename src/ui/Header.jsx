import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";


const Header = ({ toggleMenu }) => {

  return (
    <div className="flex items-center justify-between px-5 py-3 shadow">
      <div className="flex gap-4 items-center">
        <RxHamburgerMenu
          className="text-2xl stroke-[.3px] cursor-pointer"
          onClick={toggleMenu}
        />
        <h2 className="select-none">Categorie Name</h2>
      </div>
      <div className="left-section">
        <div className="rounded-full bg-purple-500 w-10 h-10 text-white flex items-center justify-center cursor-pointer">
          <span>AS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
