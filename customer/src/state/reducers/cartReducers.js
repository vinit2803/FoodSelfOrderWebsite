const initialState = {
  cartItems: [],
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            // x._id === existItem._id ? item : x
            x._id === existItem._id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }

    case "DECREMENT":
      const itemToDecrement = state.cartItems.find(
        (x) => x._id === action.payload
      );
      if (itemToDecrement.quantity > 1) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x._id === itemToDecrement._id
              ? { ...x, quantity: x.quantity - 1 }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x._id !== action.payload),
        };
      }

    default:
      return state;
  }
};

export default cartReducers;
