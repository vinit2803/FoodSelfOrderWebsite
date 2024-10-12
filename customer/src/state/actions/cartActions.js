export const increment = (product) => {
  return (dispatch) => {
    dispatch({ type: "INCREMENT", payload: product });
  };
};

export const decrement = (product_id) => {
    return (dispatch) => {
      dispatch({
        type: "DECREMENT",
        payload: product_id,
      });
    };
  };
  