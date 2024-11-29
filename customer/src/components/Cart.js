import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../state/actions/cartActions";
import "../css/Cart.css";
import alertContext from "../context/alert/alertContext";
import orderContext from "../context/order/orderContext";
import { useNavigate } from "react-router-dom";
import customerContext from "../context/customer/customerContext";
import io from "socket.io-client";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { showAlert } = useContext(alertContext);
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

  const socket = io("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  const handleIncrement = (item) => {
    dispatch(increment(item));
  };

  const handleDecrement = (id) => {
    dispatch(decrement(id));
  };

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure customer is logged in and order is valid
    const customer = await checkauthlogin();
    if (!customer.isAuthenticated) {
      navigate("/login");
      return showAlert("Please login before placing order.", "danger");
    }

    // Prepare order details
    const items = cartItems.map((item) => ({
      menuitemId: item._id,
      quantity: item.quantity,
    }));

    setLoading(true);
    try {
      await createOrder(customer.userId, order.tableNumber, items);
      showAlert("Order placed successfully!", "success");

      // Emit the orderPlaced event to notify the kitchen
      socket.emit("orderPlaced", {
        customer: customer,
        tableNumber: order.tableNumber,
        items: items,
      });

      console.log("Order placed and emitted:", {
        customer,
        tableNumber: order.tableNumber,
        items,
      });

      navigate("/orderhistory");
    } catch (error) {
      showAlert("Error placing the order. Please try again.", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("orderStatusUpdated", (orderData) => {
      showAlert(
        `Order ${orderData.id} status updated to: ${orderData.status}`,
        "info"
      );
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, [showAlert, socket]);

  return (
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
              <img src={item.image} alt={item.name} className="cart-item-img" />
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
  );
};

export default Cart;
