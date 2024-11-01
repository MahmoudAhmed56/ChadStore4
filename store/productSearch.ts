import { data } from "@/Request/data";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: data,
  searchTerm: "",
  filterData: []
};
const searchProduct = createSlice({
  name: "products",
  initialState,
  reducers : {
    setProducts(state,action){
      state.products = action.payload
    },
    setSearchTerm(state,action){
      state.searchTerm = action.payload
      state.filterData = state.products.filter(product=>
        product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
    }
  }
  // extraReducers
});
export const {setProducts,setSearchTerm} = searchProduct.actions
export default searchProduct.reducer