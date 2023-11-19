import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import globalReducer from "./globalReducer";
import wishlistReducer from "./wishlistReducer";
import shopReducer from "./shopReducer";
import { api } from './../api/apiSlice';
const rootReducer = combineReducers({
  cartReducer,
  globalReducer,
  wishlistReducer,
  shopReducer,
  [api.reducerPath]: api.reducer,
});

export default rootReducer;
