import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../state/actions/cartActions";
import "../css/Cart.css";
import alertContext from "../context/alert/alertContext"; // Import alert context
import orderContext from "../context/order/orderContext";
import { useNavigate } from "react-router-dom";
import customerContext from "../context/customer/customerContext";

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

  const contextcustomer = useContext(customerContext);
const{verifytoken} = contextcustomer;

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
    // Fetch the customer ID using the token when "Place Order" is clicked
    const customerId = await verifytoken();
    if (!customerId) {
      showAlert("Error retrieving customer information.", "danger");
      return;
    }
    // Prepare items for order
    const items = cartItems.map((item) => ({
      menuitemId: item._id,
      quantity: item.quantity,
    }));

    // setOrder((prevOrder) => ({
    //   ...prevOrder,
    //   customerId, // Set the fetched customer ID here
    // }));

    // console.log(order.customerId);
    
    // await createOrder(order.customerId, order.tableNumber, items);
    await createOrder(customerId, order.tableNumber, items);
    navigate("/");
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
