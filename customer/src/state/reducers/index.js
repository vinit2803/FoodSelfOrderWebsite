import { combineReducers } from "redux";
import cartReducers from "./cartReducers";

const reducers = combineReducers({
  cart: cartReducers, //you can add all your reducers
});

export default reducers;
