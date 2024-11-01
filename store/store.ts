import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoriteReducer from "./favoriteSlice";
import searchReducer from "./productSearch";

const store = configureStore({
  reducer:{
    cart:cartReducer,
    favorite:favoriteReducer,
    search:searchReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch=typeof store.dispatch
export default store