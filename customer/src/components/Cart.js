import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../state/actions/cartActions";
import "../css/Cart.css";
import alertContext from "../context/alert/alertContext";
import orderContext from "../context/order/orderContext";
import { useNavigate } from "react-router-dom";
import customerContext from "../context/customer/customerContext";
import io from "socket.io-client";

// Connect to your Socket.IO server
const socket = io("http://localhost:5000", {
  withCredentials: true, // Set to true if you want to include credentials with requests
});
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { showAlert } = useContext(alertContext);

  const handleIncrement = (item) => {
    dispatch(increment(item));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const contextcustomer = useContext(customerContext);
  const { checkauthlogin } = contextcustomer;

  const context = useContext(orderContext);
  const { createOrder } = context;
  const [order, setOrder] = useState({
    customerId: "",
    tableNumber: "",
    items: [],
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customer = await checkauthlogin();
    if (!customer.isAuthenticated) {
      navigate("/login");
      return showAlert("Please login before placing order.", "danger");
    }

    if (
      order.tableNumber === "" ||
      isNaN(order.tableNumber) ||
      order.tableNumber <= 0
    ) {
      return showAlert("Please enter a valid table number", "danger");
    }

    if (cartItems.length === 0) {
      return showAlert(
        "Your cart is empty. Add items to place an order.",
        "danger"
      );
    }

    const items = cartItems.map((item) => ({
      menuitemId: item._id,
      quantity: item.quantity,
    }));

    setLoading(true);
    try {
      await createOrder(customer.userId, order.tableNumber, items);
      showAlert("Order placed successfully!", "success");
      socket.emit("orderPlaced", {
        customer,
        tableNumber: order.tableNumber,
        items,
      }); // Emit orderPlaced event
      navigate("/orderhistory");
    } catch (error) {
      showAlert("Error placing the order. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for order status updates from the kitchen
    socket.on("orderStatusUpdated", (orderData) => {
      showAlert(
        `Order ${orderData.id} status updated to: ${orderData.status}`,
        "info"
      );
    });

    // Cleanup on unmount
    return () => {
      socket.off("orderStatusUpdated");
    };
  }, [showAlert]);

  return (
    <>
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="input-group mb-3">
          <input
            type="number"
            name="tableNumber"
            placeholder="Table Number"
            value={order.tableNumber}
            onChange={onChange}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>

        <div className="container text-center">
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>

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
    </>
  );
};

export default Cart;
