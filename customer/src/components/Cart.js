import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../state/actions/cartActions";
import "../css/Cart.css";
import alertContext from "../context/alert/alertContext"; // Import alert context
import orderContext from "../context/order/orderContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { showAlert } = useContext(alertContext); // Access showAlert from context

  const handleIncrement = (item) => {
    dispatch(increment(item));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const context = useContext(orderContext);
  const { createOrder } = context;
  const [order, setOrder] = useState({
    customerId: "",
    tableNumber: "",
    items: [],
  });
  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are items in the cart before placing the order
    if (cartItems.length === 0) {
      showAlert("Your cart is empty. Add items to place an order.", "danger");
      return;
    }

    // Prepare items for order
    const items = cartItems.map((item) => ({
      menuitemId: item._id,
      quantity: item.quantity,
    }));

    await createOrder(order.customerId, order.tableNumber, items);
navigate("/");
    // const orderDetails = {
    //   customerId: "67054de4bb24912478f3d960", // Replace with the actual customer ID
    //   tableNumber: 5,
    //   items: cartItems.map((item) => ({
    //     menuitemId: item._id,
    //     quantity: item.quantity,
    //   })),
    // };

    // try {
    //   const response = await fetch("http://localhost:5000/api/order/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDU0ZGU0YmIyNDkxMjQ3OGYzZDk2MCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyODc1MDM5OCwiZXhwIjoxNzI4NzUzOTk4fQ.o3jkZ6pvhCFSgmZ7b4-kB4ckgDZMFCThThFd312_5ys", // Replace with the actual token
    //     },
    //     body: JSON.stringify(orderDetails),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to place the order");
    //   }

    //   const result = await response.json();
    //   console.log(result);

    //   showAlert("Order placed successfully!", "success"); // Show success alert
    //   // Optionally, you can reset the cart or redirect the user after placing the order
    //   // dispatch(resetCart()); // Uncomment if you want to reset the cart after placing the order
    // } catch (error) {
    //   console.error(error);
    //   showAlert("Error placing the order. Please try again.", "danger"); // Show error alert
    // }
  };

  return (
    <>
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p>
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="cart-item-controls">
                    <button
                      className="btn-decrement"
                      onClick={() => handleDecrement(item._id)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="btn-increment"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Input Fields for Order Details */}
      <div>
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={order.customerId}
          onChange={onChange}
        />
        <input
          type="number"
          name="tableNumber"
          placeholder="Table Number"
          value={order.tableNumber}
          onChange={onChange}
        />
      </div>
      <div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Place Order
        </button>
      </div>
    </>
  );
};

export default Cart;
