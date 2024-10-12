import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import Home from "./components/Home";
import MenuState from "./context/menu/MenuState";
import Bill from "./components/Bill";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
// import Alert from "./components/Alert";
import AlertState from "./context/alert/AlertState";
import Menu from "./components/Menu";
import OrderState from "./context/order/OrderState";

function App() {
  return (
    <>
      <AlertState>
        <MenuState>
          <OrderState>
            <Router>
              <Navbar></Navbar>
              {/* <Alert alert={alert}></Alert> */}
              <div style={{ paddingTop: "40px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/bill" element={<Bill />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/contactus" element={<ContactUs />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </div>
            </Router>
          </OrderState>
        </MenuState>
      </AlertState>
    </>
  );
}

export default App;
