import React from "react";
import CustomerContext from "./customerContext";
import { useNavigate } from "react-router-dom";

const CustomerState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const navigate = useNavigate();

  // login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (json.token != null) {
        localStorage.setItem("token", json.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   from token and get cutomerid
  const verifytoken = async () => {
    try {
      const response = await fetch(`${host}/api/customer/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();

     
      return json.id;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <CustomerContext.Provider value={{  login, verifytoken }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
