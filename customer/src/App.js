import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./components/Home";
import MenuState from "./context/menu/MenuState";
import Bill from "./components/Bill";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <MenuState>
        <Router>
          <Navbar></Navbar>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/bill" element={<Bill />} />
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </MenuState>
    </>
  );
}

export default App;
