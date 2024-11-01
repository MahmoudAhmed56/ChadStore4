"use client";
import {  useToast } from "@/hooks/use-toast";
import {  addItemOnce } from "@/store/cartSlice";
import { Product } from "@/typy";
import { useDispatch } from "react-redux";
type props = {
  product: Product;
};
const AddToCart = ({ product }: props) => {
  const dispatch = useDispatch();
  const {toast} = useToast()
  const addToCartHandler = () => {
    toast({
      description: "Item Added To Cart",
      variant: "success",
    });
    dispatch(addItemOnce(product));
  };
  return (
    <button onClick={()=>addToCartHandler()} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center w-full select-none">Add to Cart</button>
  )
};

export default AddToCart;
