import React, { useState } from "react";
import MenuContext from "./menuContext";

const MenuState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const menuInitial = [];

  const [menu, setMenu] = useState(menuInitial);

  //   fetch all menu
  const getMenu = async () => {
    const response = await fetch(`${host}/api/menuitem/gellfullmenu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    
    setMenu(json);
  };

  return (
    <MenuContext.Provider value={{ menu, getMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuState;
