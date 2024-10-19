import React, { useContext } from "react";
import CustomerContext from "./customerContext";
import { useNavigate } from "react-router-dom";
import alertContext from "../alert/alertContext";

const CustomerState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext); // Access showAlert from context

  // login
  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/customer/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Ensure cookies are included in the request
      });
      const json = await response.json();
// console.log(json);

      
    if (json.ok) {
        showAlert(json.message, "success");
        // localStorage.setItem("token", json.token);
        navigate("/");
      } else {
        showAlert(json.message, "danger");
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
    <CustomerContext.Provider value={{ login, verifytoken }}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
