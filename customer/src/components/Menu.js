import React, { useContext, useEffect } from "react";
import menuContext from "../context/menu/menuContext";
import Menuitem from './Menuitem'

const Menu = () => {
  const { menu, getMenu } = useContext(menuContext);
  
  useEffect(() => {
    getMenu();
    // eslint-disable-next-line
  },[]);
  return (
    <>
      <div className="container">
      <div className="row">
        {menu.map((item) => (
          <Menuitem key={item._id} menuItem={item} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Menu
