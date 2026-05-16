import React from 'react'
import { NavLink } from "react-router";

const AsideMenuItem = ({categ, icon, to, setMenu}) => {
  return (
    <NavLink
      to={to}
      className="py-1 px-4 mb-1 hover:bg-slate-700 rounded-lg text-sm font-bold block"
      style={({ isActive }) => ({
        backgroundColor: isActive ? "#314158" : "",
      })}
      onClick={() => setMenu(false)}
    >
      <span className="pr-3 text-xl">{icon}</span> {categ}
    </NavLink>
  );
}

export default AsideMenuItem