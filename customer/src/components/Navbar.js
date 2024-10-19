import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/Navbar.css";

const Navbar = () => {
  
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <motion.div
          className="brand"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img src="/logo192.png" alt="Foodie Logo" className="brand-logo" />
          <NavLink className="brandLink" to="/">
            Foodie
          </NavLink>
        </motion.div>
        <div className="menu">
          <ul>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  About
                </NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/menu"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Menu
                </NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/bill"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Bill
                </NavLink>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <NavLink
                  to="/contactus"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact Us
                </NavLink>
              </motion.div>
            </li>
            
            <li>
              
            {!localStorage.getItem("token") ? (
              <form  role="search">
                <NavLink  to="/Login">
                  Login
                </NavLink>
                <NavLink  to="/SignUp">
                  SignUp
                </NavLink>
              </form>
            ) : (
              <NavLink onClick={handlelogout} >
                LogOut
              </NavLink>
            )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
