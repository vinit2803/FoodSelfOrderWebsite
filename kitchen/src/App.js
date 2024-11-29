import "./App.css";
import Kitchen from "./components/Kitchen";
// import Navbar from "./components/Navbar";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
    
      <Router>
        {/* <Navbar /> */}
        <Kitchen />
      </Router>
    </>
  );
}

export default App;
