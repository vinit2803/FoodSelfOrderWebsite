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
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CustomerState from "./context/customer/CustomerState";

function App() {
  return (
    <>
      <AlertState>
        <MenuState>
          <OrderState>
            <Router>
              <CustomerState>
                <Navbar></Navbar>
                {/* <Alert alert={alert}></Alert> */}
                <div style={{ paddingTop: "40px" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/bill" element={<Bill />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/cart" element={<Cart />} />
                  </Routes>
                </div>
              </CustomerState>
            </Router>
          </OrderState>
        </MenuState>
      </AlertState>
    </>
  );
}

export default App;
