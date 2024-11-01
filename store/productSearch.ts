import { data } from "@/Request/data";
import { createSlice } from "@reduxjs/toolkit";

type initial = {
  products: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
  }[];
  searchTerm: string;
  filterData: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
    };
  }[];
};

const initialState: initial = {
  products: data,
  searchTerm: "",
  filterData: [],
};
const searchProduct = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filterData = state.products.filter((product) =>
        product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
  // extraReducers
});
export const { setProducts, setSearchTerm } = searchProduct.actions;
export default searchProduct.reducer;
