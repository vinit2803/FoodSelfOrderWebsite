import React, { useContext, useState } from "react";
import OrderContext from "./orderContext";
import alertContext from "../alert/alertContext";

const OrderState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const orderInitial = [];
  const { showAlert } = useContext(alertContext);
  const [order, setOrder] = useState(orderInitial);

  // create an order
  const createOrder = async (customerId, tableNumber, items) => {
    try {
      // api call
      const response = await fetch(`${host}/api/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ customerId, tableNumber, items }),
      });
      const json = await response.json();
      showAlert("Your Order has been placed successfully", "success");
      if (!response.ok) {
        throw new Error("Error creating order");
      }
      setOrder(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider value={{ order, createOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
