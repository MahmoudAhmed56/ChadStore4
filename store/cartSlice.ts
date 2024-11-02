import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface CartItem {
  id: number;
  title: string;
  price: number;
  category: {
    name: string;
  };
  images: string[];
  quantity: number;
  description: string;
}
interface CartState {
  items: CartItem[];
}


const initialState: CartState = {
  items:
     []
};

// adding this function to prevent repear code
// const setCartListFunc = (products: any) => {
//   localStorage.setItem("cartList", JSON.stringify(products));
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // setCartListFunc(state.items.map((item) => item));
    },
    addItemOnce: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // setCartListFunc(state.items.map((item) => item));
    },
    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
        } else {
          state.items = state.items.filter(
            (item) => item.id != action.payload.id
          );
        }
      }
      // setCartListFunc(state.items.map((item) => item));
    },
    removeAllItems: (state, action: PayloadAction<{ id: number }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id != action.payload.id
        );
      }
      // setCartListFunc(state.items.map((item) => item));
    },
    clearCart: (state) => {
      state.items = [];
      // setCartListFunc(state.items.map((item) => item));
    },
  },
});

export const { addItem, removeItem, removeAllItems, clearCart, addItemOnce } =
  cartSlice.actions;

export default cartSlice.reducer;
