import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "../App.css"; // Assuming your styles are in App.css

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0 }}  // Animation when component appears
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo on the left */}
      <motion.div
        className="branddiv"
        whileHover={{ scale: 1.1 }}  // Hover effect
        whileTap={{ scale: 0.9 }}    // Tap effect
      >
        <NavLink to="/" className="brandLink">
          <img src="Foodie" alt="Foodie Logo" className="brand-logo" />
          Foodie
        </NavLink>
      </motion.div>

      {/* Navbar links on the right */}
      <motion.div
        className={`nav-links ${isOpen ? "open" : ""}`}
        initial={{ x: 100 }}        // Sliding animation
        animate={{ x: isOpen ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="nav-ul">
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/about" className="nav-item">
                About
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/menu" className="nav-item">
                Menu
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/bill" className="nav-item">
                Bill
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/contact" className="nav-item">
                Contact Us
              </NavLink>
            </motion.div>
          </li>
          <li>
            <motion.div
              whileHover={{ scale: 1.1, color: "cyan" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink to="/cart" className="nav-item">
                Cart
              </NavLink>
            </motion.div>
          </li>
        </ul>
      </motion.div>

      {/* Hamburger menu */}
      <motion.div
        className="hamburger"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}  // Hover effect for hamburger
        whileTap={{ scale: 0.9 }}    // Tap effect for hamburger
      >
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;



// import React from "react";
// import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import "../App.css";

// const Navbar = () => {
//   return (
//     <>
//       <div className="navbar">
//         <div className="branddiv">
//           <motion.div className="brand">
//             <NavLink className="brandLink">
//               <img src="Foodie" alt="Foodie Logo" className="brand-logo" />
//               Foodie
//             </NavLink>
//           </motion.div>
//         </div>

//         <div className="otherlinks">
//           <div className="otherlinksflex">
//             <ul className="ul">
//               <li>
//                 <motion.div className="homemotiondiv">
//                   <NavLink
//                     to="/"
//                     id="home"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     Home
//                   </NavLink>
//                 </motion.div>
//               </li>
//               <li>
//                 <motion.div className="aboutmotiondiv">
//                   <NavLink
//                     to="/"
//                     id="about"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     About
//                   </NavLink>
//                 </motion.div>
//               </li>
//               <li>
//                 <motion.div className="menumotiondiv">
//                   <NavLink
//                     to="/"
//                     id="menu"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     Menu
//                   </NavLink>
//                 </motion.div>
//               </li>
//               <li>
//                 <motion.div className="billmotiondiv">
//                   <NavLink
//                     to="/"
//                     id="bill"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     Bill
//                   </NavLink>
//                 </motion.div>
//               </li>
//               <li>
//                 <motion.div className="contactusmotiondiv">
//                   <NavLink
//                     to="/"
//                     id="contactus"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     ContactUs
//                   </NavLink>
//                 </motion.div>
//               </li>
//               <li>
//                 <motion.div className="cartmotiondiv">
//                   <NavLink
//                     to="/"
//                     id="cart"
//                     className={({ isActive }) => (isActive ? "active" : "h")}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="25"
//                       height="25"
//                       fill="currentColor"
//                       className="bi bi-cart3"
//                       viewBox="0 0 16 16"
//                     >
//                       <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
//                     </svg>
//                     Cart
//                   </NavLink>
//                 </motion.div>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
