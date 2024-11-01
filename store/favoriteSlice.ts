import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  category: {
    name:string
  };
  images: string[];
  quantity: number;
  description: string;
}
interface FavoriteState {
  items: FavoriteItem[];
}
const initialState: FavoriteState = {
  items: window.localStorage.getItem("favoriteList") !== null
  ? JSON.parse(window.localStorage.getItem("favoriteList") || '[]')
  : [],
};
// 
// adding this function to prevent repear code
const setFavoriteListFunc = (products:any) => {
  window.localStorage.setItem("favoriteList", JSON.stringify(products));
};

const FavoriteSlice = createSlice({
  name:"favorite",
  initialState,
  reducers:{
    addToFavorite:(state, action: PayloadAction<Omit<FavoriteItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      setFavoriteListFunc(
        state.items.map((item) => item)
      );
    },
    removeFromFavorite: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id != action.payload.id
        );
      }
      setFavoriteListFunc(
        state.items.map((item) => item)
      );
    },
    clearFavorite:(state)=>{
      state.items= [];
      setFavoriteListFunc(
        state.items.map((item) => item)
      );
    }
  }
})
export const {addToFavorite,removeFromFavorite,clearFavorite}=FavoriteSlice.actions;

export default FavoriteSlice.reducer