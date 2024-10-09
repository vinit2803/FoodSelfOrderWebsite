import "../css/App.css";
import React from "react";

const Menuitem = (props) => {
  const {menuItem } = props;
  
  // const { menu, getMenu } = useContext(menuContext);
  // useEffect(() => {
  //   getMenu();
  // },[]);
  
  return (
    <>
      {/* {menu.map((menu) => ( */}
        <div className="col-md-4 col-sm-6 mb-4">
          <div className="card h-100">
            <img
              src={menuItem.image}
              className="card-img-top"
              alt={menuItem.name}
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{menuItem.name}</h5>
              <p className="card-text">{menuItem.description}</p>
              <p className="card-text">
                <strong>Category:</strong> {menuItem.category}
              </p>
              <p className="card-text">
                <strong>Price:</strong> ${menuItem.price}
              </p>
              <p className="card-text">
                <strong>Availability:</strong>{" "}
                {menuItem.available === "Yes" ? "Available" : "Not Available"}
              </p>
              <button className="btn btn-primary mt-auto">Add to Cart</button>
            </div>
          </div>
        </div>
      {/* ))}; */}
    </>
  );
};

export default Menuitem;
