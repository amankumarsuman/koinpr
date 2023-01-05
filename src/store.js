import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import { CartReducers } from "./redux/reducer";
import { snackbarNotificationReducer } from "./redux/snackbar.reducer";

const reducer = combineReducers({
  // cart: cartReducer
  cart: CartReducers,
  snackbarNotification: snackbarNotificationReducer,

});

export default configureStore({
  reducer,
  composeWithDevTools,
});
