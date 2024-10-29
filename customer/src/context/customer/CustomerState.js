import React, { useContext, useState } from "react";
import CustomerContext from "./customerContext";
import { useNavigate } from "react-router-dom";
import alertContext from "../alert/alertContext";

const CustomerState = (props) => {
  const port = 5000;
  const host = `http://localhost:${port}`;
  const navigate = useNavigate();
  const { showAlert } = useContext(alertContext); // Access showAlert from context

  const [success, setSuccess] = useState(false);
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

      if (json.CustomerId != null) {
        showAlert(json.message, "success");
        setSuccess(json.success);
        navigate("/");
      } else {
        showAlert(json.message, "danger");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   from token and get cutomerid
  // verifytoken function - CustomerState.js
  const verifytoken = async () => {
    try {
      const response = await fetch(`${host}/api/customer/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensure cookies are included in the request
      });

      const json = await response.json();

      if (response.ok) {
        return json; // Return customer ID if verification succeeds
      } else {
        console.error("Token verification failed");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const checkauthlogin = async () => {
    try {
      const response = await fetch(`${host}/api/customer/checkauth`, {
        method: "GET",
        credentials: "include", // Make sure this is included to send cookies
      });
      const json = await response.json();
      setSuccess(json.isAuthenticated); // Updating your context state
      return json; // Return the whole response (with isAuthenticated and user info)
    } catch (error) {
      console.error(error);
      return { isAuthenticated: false }; // Return an object even in case of error
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${host}/api/customer/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });
     console.log(response.ok);
     

      if (response.ok) {
        setSuccess(false);
        showAlert("Logout successfully", "success");
        navigate("/login"); // Redirect to login page
      } else {
        showAlert("falied to logout", "danger");
      }
    } catch (error) {
      showAlert("falied to logout", "danger");
    }
  };

  return (
    <CustomerContext.Provider
      value={{ success, login, verifytoken, checkauthlogin, logout }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
