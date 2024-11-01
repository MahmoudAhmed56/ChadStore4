"use client";
import { Product } from "@/typy";
import { useState, useEffect } from "react";

import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
import { data } from "@/Request/data";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
const AllProduct = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const products: Product[] = data;
        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="pt-16 pb-12 w-4/5 mx-auto mt-16">
      <h2 className="text-center font-bold text-2xl">New Products</h2>
      {loading ? (
        <Skeleton/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.slice(0,3).map((product)=>{
            return(
              <ProductCard key={product.id} product={product}/>
            )
          })}
        </div>
      )}
         <div className="m-auto w-fit">
           <Link href={"/all-products"}
           className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-center 
           me-2 mb-2 py-4 px-6 font-semibold text-xl w-full rounded-full flex items-center justify-center mt-3"
           >
           <span className="mr-2 inline-block">view All Products</span>
           <span className="inline-block"><CircleArrowRight /></span>
           </Link>
         </div>
    </div>
  );
};

export default AllProduct;
