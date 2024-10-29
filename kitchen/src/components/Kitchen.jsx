import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Listen for new orders from the server
    socket.on("newOrderToKitchen", (orderData) => {
      setOrders((prevOrders) => [...prevOrders, orderData]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("newOrderToKitchen");
    };
  }, []);

  const updateOrderStatus = (orderId, status) => {
    // Emit the updated order status to the server
    socket.emit("updateOrderStatus", { id: orderId, status });
  };

  return (
    <div>
      <h2>Kitchen Orders</h2>
      {orders.map((order) => (
        <div key={order.customer.userId}>
          <h4>Order ID: {order.customer.userId}</h4>
          <p>Table Number: {order.tableNumber}</p>
          <button onClick={() => updateOrderStatus(order.customer.userId, "In Progress")}>
            In Progress
          </button>
          <button onClick={() => updateOrderStatus(order.customer.userId, "Completed")}>
            Completed
          </button>
        </div>
      ))}
    </div>
  );
};

export default Kitchen;
