import "./App.css";
import Home from "./components/Home";
import MenuState from "./context/menu/MenuState";

function App() {
  return (
    <>
      <MenuState>
        <Home></Home>
      </MenuState>
    </>
  );
}

export default App;
