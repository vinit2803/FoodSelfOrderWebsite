import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext"; // Ensure this path is correct
import "../css/Alert.css"; // Import your CSS file

const Alert = () => {
  const { alert } = useContext(alertContext); // Access the alert from context

  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div className="alert-container">
      {alert && (
        <div
          className={`alert alert-${alert.type}`}
          role="alert"
        >
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
