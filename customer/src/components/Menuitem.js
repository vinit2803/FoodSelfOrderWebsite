import "../css/Menuitem.css";
import React from "react";

const Menuitem = (props) => {
  const { menuItem } = props;
  // console.log(menuItem.image);
  

  return (
    <>
      <div className="maindiv">
        <div className="divdisplay">
          <div className="image">
            <img
              src={menuItem.image}
              className="card-img-top"
              alt={menuItem.name}
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
          </div>
          <div className="divname">
            <h5 className="card-title">{menuItem.name}</h5>
          </div>
          <div className="divname">
            <h5 className="card-title">{menuItem.category}</h5>
          </div>
          <div className="forspan">
            <span className="horizontalline"></span>
          </div>
          <div className="price">
            <p className="card-text">
              <strong>Price:</strong> ${menuItem.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menuitem;
