import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { CartReducers } from "./redux/reducer";

const reducer = combineReducers({
  // cart: cartReducer
  cart: CartReducers,
});

export default configureStore({
  reducer,
  composeWithDevTools,
});
