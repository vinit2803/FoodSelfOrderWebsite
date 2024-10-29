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
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ customerId, tableNumber, items }),
        credentials: "include",
      });
      const json = await response.json();
      if (response.ok) {
        showAlert("Your order has been placed successfully", "success");
        setOrder(json); // Update state with the new order
      } else {
        throw new Error(json.message || "Error creating order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      showAlert("Error creating order", "danger");
    }
  };

  // get order by customer id
  const getorderhistory = async () => {
    try {
      // api call
      const response = await fetch(`${host}/api/order/orderhistory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        },
        credentials: "include",
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error("Error creating order");
      }
      showAlert("Order History fetched successfully", "success");

      return json;
    } catch (error) {
      // console.error(error);
      showAlert("Please Login to see Your Old Order","danger")
      return [];
    }
  };
  return (
    <OrderContext.Provider value={{ order, createOrder, getorderhistory }}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
