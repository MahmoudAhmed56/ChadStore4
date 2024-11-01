"use client";
import { Product } from "@/typy";
import Link from "next/link";
import "./product.css";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { Info } from "lucide-react";
import {useDispatch} from "react-redux"
import { addItemOnce } from "@/store/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { addToFavorite } from "@/store/favoriteSlice";

type props = {
  product: Product;
};

const ProductCard = ({ product }: props) => {
  const inside = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState("overflow-hidden");
  const { toast } = useToast()
  
  const dispatch = useDispatch()
  const addToCartHandler = (product : Product)=>{
    toast({
      description: "Item Added To Cart",
      variant:"success",
    })
    dispatch(addItemOnce(product))
  }
  const addToFavoriteHandler = (product : Product)=>{
    toast({
      description: "Item Added To Favorite",
      variant:"success",
    })
    dispatch(addToFavorite(product))
  }
  return (
    <div>
      <div className="wrapper border border-slate-200 rounded-lg">
      <div className="relative flex flex-col bg-white shadow-sm ">
  <div className="relative overflow-hidden bg-clip-border h-[400px]">
    <img
      src={product.images[0]}
      alt={product.title}
      className="h-full w-full object-cover"
    />
  </div>
  <div className="p-4">
    <div className="mb-2 flex items-center justify-between">
      <Link href={`/product/product-details/${product?.id}`} className="text-slate-800 text-xl font-semibold line-clamp-1 select-none decoration-2 decoration-sky-200 hover:underline">
      {product.title}
      </Link>
      <p className="text-cyan-600 text-xl font-semibold">
        ${product.price}
      </p>
    </div>
    <p className="text-slate-600 leading-normal font-light line-clamp-1">
    {product.description}
    </p>
    <div className="mt-3 flex gap-3 flex-wrap">
      <button onClick={()=>addToCartHandler(product)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center w-full select-none">Add to Cart</button>
      <button onClick={()=>addToFavoriteHandler(product)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-md px-5 py-2.5 text-center w-full select-none">Add to Favorite</button>
    </div>
  </div>
</div>
        <div
          ref={inside}
          className={`inside ${scroll} bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700`}
          onMouseLeave={() => {
            setScroll("overflow-hidden");
            inside?.current?.scrollTo({ top: 0 });
          }}
          onMouseEnter={() => {
            setScroll("overflow-auto");
          }}
        >
          <div className="icon">
            <i>
              <Info />
            </i>
          </div>
          <div className="contents2">
            <div className="flow-root rounded-lg border border-[#000] py-3 shadow-sm">
              <dl className="-my-3 divide-y divide-black text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 even:bg-[#a6cdde] sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-[#000]">Title</dt>
                  <dd className="sm:col-span-2">
                    {product?.title}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-[#a6cdde] sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-[#000]">Price</dt>
                  <dd className="sm:col-span-2">
                    ${product.price}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-[#a6cdde] sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-[#000]">Category</dt>
                  <dd className="sm:col-span-2">
                    {product?.category?.name}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-[#a6cdde] sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-[#000]">Description</dt>
                  <dd className="sm:col-span-2">
                    {product?.description}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 even:bg-[#a6cdde] sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-[#000]">Available</dt>
                  <dd className="sm:col-span-2">Yes</dd>
                </div>
              </dl>
            </div>
            
              <Link className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-semibold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 select-none mt-2 inline-block w-full" href={`/product/product-details/${product?.id}`}>
                More Details
              </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
