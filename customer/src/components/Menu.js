import React, { useContext, useEffect, useState } from "react";
import menuContext from "../context/menu/menuContext";
import Menuitem from "./Menuitem";
import { useDispatch, useSelector } from "react-redux";
import alertContext from "../context/alert/alertContext";
import { increment, decrement } from "../state/actions/cartActions";
import "../css/Menu.css";

const Menu = () => {
  const { menu, getMenu } = useContext(menuContext);
  const dispatch = useDispatch();
  const { showAlert } = useContext(alertContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // State to handle filtered menu and selected category
  const [filteredMenu, setFilteredMenu] = useState(menu); // Initialize with the menu directly
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch the menu only once on component mount
  useEffect(() => {
    if (menu.length === 0) {
      getMenu(); // Fetch menu from API
    } else {
      setFilteredMenu(menu); // Initialize with the full menu
    }
  }, [menu, getMenu]); // Dependency on menu and getMenu

  // Effect to filter menu based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredMenu(menu); // Show all items
    } else {
      const filteredItems = menu.filter((item) => item.category === selectedCategory);
      setFilteredMenu(filteredItems); // Filter by selected category
    }
  }, [selectedCategory, menu]); // Dependency on selectedCategory and menu

  // Function to get item quantity in the cart
  const getCartItemQuantity = (itemId) => {
    const itemInCart = cartItems.find((item) => item._id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // This will trigger the filtering effect
  };

  return (
    <>
      {/* Buttons for category filtering */}
      <div className="category-buttons">
        <button
          onClick={() => handleCategorySelect("All")}
          className={selectedCategory === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleCategorySelect("Indian")}
          className={selectedCategory === "Indian" ? "active" : ""}
        >
          Indian
        </button>
        <button
          onClick={() => handleCategorySelect("Chinese")}
          className={selectedCategory === "Chinese" ? "active" : ""}
        >
          Chinese
        </button>
        <button
          onClick={() => handleCategorySelect("Mexican")}
          className={selectedCategory === "Mexican" ? "active" : ""}
        >
          Mexican
        </button>
      </div>

      <div className="main">
        <div className="insidemain">
          {filteredMenu.map((item) => (
            <div className="content" key={item._id}>
              <div className="menucard">
                <Menuitem key={item._id} menuItem={item} />
                <div className="cartcontrol">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => {
                      if (getCartItemQuantity(item._id) > 0) {
                        dispatch(decrement(item._id));
                        showAlert("Item Removed From Cart", "success");
                      }
                    }}
                    disabled={getCartItemQuantity(item._id) === 0}
                  >
                    -
                  </button>
                  <span className="quantity-display mx-2">
                    {getCartItemQuantity(item._id)}
                  </span>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => {
                      dispatch(increment(item));
                      showAlert("Item Added In Cart", "success");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
