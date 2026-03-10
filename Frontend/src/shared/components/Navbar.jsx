import React, { useState } from "react";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full p-5 flex justify-between items-center bg-black text-white relative">
      <div className="left">
        <span className="text-3xl font-medium">NextFlix</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex right">
        <ul className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm transition-colors duration-200 ${
                isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Home
          </NavLink>
          <NavLink
            to="/tvshows"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm transition-colors duration-200 ${
                isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            TV Shows
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm transition-colors duration-200 ${
                isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Movies
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `py-1 px-3 rounded-sm transition-colors duration-200 ${
                isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`
            }>
            Favorite
          </NavLink>
          {user && (
            <span className="px-3 font-bold text-2xl  text-orange-600">
              {user.fullname || user.email}
            </span>
          )}
          {user ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="py-1 px-3 rounded-sm bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `py-1 px-3 rounded-sm transition-colors duration-200 ${
                    isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
                  }`
                }>
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `py-1 px-3 rounded-sm transition-colors duration-200 ${
                    isActive ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
                  }`
                }>
                Signup
              </NavLink>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 z-50">
          <ul className="flex flex-col py-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-5 transition-colors duration-200 ${
                  isActive ? "bg-orange-600" : "hover:bg-gray-800"
                }`
              }>
              Home
            </NavLink>
            <NavLink
              to="/tvshows"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-5 transition-colors duration-200 ${
                  isActive ? "bg-orange-600" : "hover:bg-gray-800"
                }`
              }>
              TV Shows
            </NavLink>
            <NavLink
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-5 transition-colors duration-200 ${
                  isActive ? "bg-orange-600" : "hover:bg-gray-800"
                }`
              }>
              Movies
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-5 transition-colors duration-200 ${
                  isActive ? "bg-orange-600" : "hover:bg-gray-800"
                }`
              }>
              Favorite
            </NavLink>
            {user && (
              <span className="py-3 px-5 text-gray-300">
                {user.fullname || user.email}
              </span>
            )}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className="py-3 px-5 transition-colors duration-200 hover:bg-gray-800">
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 px-5 transition-colors duration-200 ${
                      isActive ? "bg-orange-600" : "hover:bg-gray-800"
                    }`
                  }>
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3 px-5 transition-colors duration-200 ${
                      isActive ? "bg-orange-600" : "hover:bg-gray-800"
                    }`
                  }>
                  Signup
                </NavLink>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
