"use client";
import { toast } from "@/hooks/use-toast";
import { addItemOnce } from "@/store/cartSlice";
import { clearFavorite, removeFromFavorite } from "@/store/favoriteSlice";
import { RootState } from "@/store/store";
import { Product } from "@/typy";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const Favorite = () => {
  const items = useSelector((state: RootState) => state.favorite.items);
  const dispatch = useDispatch();
  const removeItemFromFavorite = (id: number) => {
    dispatch(removeFromFavorite({ id }));
  };
  const clearAllFavorite = () => {
    dispatch(clearFavorite());
  };
  const addToCartHandler = (product: Product) => {
    toast({
      description: "Item Added To Cart",
      variant: "success",
    });
    dispatch(addItemOnce(product));
  };
  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <section className="py-12 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
          My Favorite
        </h2>
        {items.length == 0 && (
          <div className="flex items-center w-full flex-col justify-center">
            <Image
              src={"/images/wishlist_empty.svg"}
              alt="wishlist_empty"
              width={200}
              height={200}
              className="object-cover mx-auto"
            />
            <h3 className="mt-8 text-2xl font-semibold">
              Your Favorite is Empty
            </h3>
          </div>
        )}
        {items.length > 0 && (
          <>
            {items?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
                >
                  <div className="col-span-12 lg:col-span-2 img box">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="mx-auto rounded-xl object-cover"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                    <div className="flex items-center justify-between w-full mb-4">
                      <Link href={`product/product-details/${item.id}`} className="font-manrope font-bold text-2xl leading-9 text-gray-900 decoration-1 decoration-sky-300 hover:underline">
                        {item.title}
                      </Link>
                      <button
                        onClick={() => {
                          removeItemFromFavorite(item.id);
                        }}
                        className="rounded-full group flex items-center justify-center focus-within:outline-red-500"
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                            fill=""
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="font-normal text-base leading-7 text-gray-500 mb-6">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => addToCartHandler(item)}
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center select-none flex gap-1"
                      >
                        Add to Cart <ShoppingCart />
                      </button>
                      <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
                        ${item.price}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 py-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            Total
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
              ${totalPrice}
            </h6>
          </div>
        </div>
        <div className="max-lg:max-w-lg max-lg:mx-auto">
          <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
            Shipping taxes, and discounts calculated at checkout
          </p>
<div className="flex flex-col lg:flex-row">
  
            {items.length == 0 ? (
              <Link
                href={"/"}
                className="inline-block text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-center me-2 mb-2 py-4 px-6 font-semibold text-lg w-full rounded-full"
              >
                Keep Shopping
              </Link>
            ) : (
              <button
                onClick={clearAllFavorite}
                type="button"
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-center me-2 mb-2 py-4 px-6 font-semibold text-lg w-full rounded-full select-none"
              >
                Delete All Favorite
              </button>
            )}
            <Link
              href={"/cart"}
              className="inline-block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-center me-2 mb-2 py-4 px-6 font-semibold text-lg w-full rounded-full select-none"
            >
              View Cart
            </Link>
            
</div>
        </div>
      </div>
    </section>
  );
};

export default Favorite;
