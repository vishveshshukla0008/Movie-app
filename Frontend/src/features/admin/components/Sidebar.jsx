import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar w-50 p-3 text-white">
      <div className="inner">
        <span>MAIN MENU</span>
        <ul className="flex flex-col w-fit">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm flex items-center gap-3 ${isActive ? "bg-orange-600" : "bg-gray-700"}`
            }>
            <MdDashboard /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm flex items-center gap-3 ${isActive ? "bg-orange-600" : "bg-gray-700"}`
            }>
            <FaUser /> Users
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm flex items-center gap-3 ${isActive ? "bg-orange-600" : "bg-gray-700"}`
            }>
            <MdLocalMovies />
            Movies
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
