import "./App.css";
import Navbar from "./components/Navbar";
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    
      <Router>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
