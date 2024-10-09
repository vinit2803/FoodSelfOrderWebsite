import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <motion.div
          className="brand"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src="/logo192.png"
            alt="Foodie Logo"
            className="brand-logo"
          />
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
                  to="/cart"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Cart
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
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
