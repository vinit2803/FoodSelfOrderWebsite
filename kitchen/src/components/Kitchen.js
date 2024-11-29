import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Initialize socket connection
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
});

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
        console.log("Connected to server with ID:", socket.id);
        socket.emit("joinKitchen");  // Emit event to join the 'kitchen' room
    });

    socket.on("newOrder", (orderData) => {
        console.log("New order received in Kitchen:", orderData);
        setOrders((prevOrders) => [...prevOrders, orderData]);
    });

    socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
    });

    socket.on("disconnect", (reason) => {
        console.log("Disconnected from server due to:", reason);
    });

    return () => {
        socket.disconnect();
        console.log("Disconnected from socket");
    };
}, []);



  return (
    <div>
      <h1>Kitchen Orders</h1>
      <ul>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <li key={index}>
              <p>Table Number: {order.tableNumber}</p>
              <p>Items: {order.items.map((item) => item.menuitemId).join(", ")}</p>
              <p>Customer ID: {order.customer.userId}</p>
            </li>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </ul>
    </div>
  );
};

export default Kitchen;
