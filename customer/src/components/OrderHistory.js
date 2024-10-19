import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderContext from "../context/order/orderContext";
import "../css/OrderHistory.css";

const OrderHistory = () => {
  const navigate = useNavigate();

  const context = useContext(orderContext);
  const { getorderhistory } = context;
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Fetch order history when component mounts
    const fetchOrders = async () => {
      const fetchedOrders = await getorderhistory();
      setOrder(fetchedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="order-history-container">
        <h2>Order History</h2>
        {order.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <div className="order-card-wrapper">
            {order.map((order) => (
              <div className="order-card" key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p>Table Number: {order.tableNumber}</p>
                <p>
                  Status: <strong>{order.status}</strong>
                </p>
                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                <p>
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <h4>Items Ordered:</h4>
                <ul>
                  {order.items.map((item) => (
                    <li key={item._id}>
                      Menu Item ID: {item.menuitemId}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
