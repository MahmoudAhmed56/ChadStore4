"use client";
import {  useToast } from "@/hooks/use-toast";
import { addToFavorite } from "@/store/favoriteSlice";
import { Product } from "@/typy";
import { useDispatch } from "react-redux";
type props = {
  product: Product;
};
const AddToFavorite = ({ product }: props) => {
  const dispatch = useDispatch();
  const {toast} = useToast()
  const addToFavoriteHandler = () => {
    toast({
      description: "Item Added To favorite",
      variant: "success",
    });
    dispatch(addToFavorite(product));
  };
  return (
    <button onClick={()=>addToFavoriteHandler()} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-md px-5 py-2.5 text-center w-full select-none">Add to Favorite</button>)
};

export default AddToFavorite;
