import React, { useState } from "react";
import OrderContext from "./orderContext";

const OrderState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const orderInitial = [];

  const [order, setOrder] = useState(orderInitial);

  // create an order
  const createOrder = async (customerId, tableNumber, items) => {
    try {
      // api call
      const response = await fetch(`${host}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDU0ZGU0YmIyNDkxMjQ3OGYzZDk2MCIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyODc1MDM5OCwiZXhwIjoxNzI4NzUzOTk4fQ.o3jkZ6pvhCFSgmZ7b4-kB4ckgDZMFCThThFd312_5ys", // Replace with the actual token
        },
        body: JSON.stringify({ customerId, tableNumber, items }),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error("Error creating order");
      }
      console.log(json);
      setOrder(json);
    } catch (error) {
      console.error(error);
      // Handle errors, maybe set an alert or log it
    }
  };

  return (
    <OrderContext.Provider value={{ order, createOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
