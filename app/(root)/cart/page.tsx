"use client";

// import PayPalButton from "@/components/Helper/PayPalButton";
import { CartItem, addItem, removeItem, clearCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const decreaseItemCart = (id: number) => dispatch(removeItem({ id }));
  const increaseItemCart = (item: CartItem) => dispatch(addItem(item));

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const vat = (+totalPrice * 0.01).toFixed(2);

  const shipping = Number(4).toFixed(2);
  const totalPriceWithVat =
    items.length > 0 ? (+totalPrice + +vat + +shipping).toFixed(2) : 0;
  const { user } = useUser();

  const handelSuccess = () => {
    router.push("/success");
    dispatch(clearCart());
  };
  return (
    <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Shopping Cart
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {totalQuantity} Items
              </h2>
            </div>

            {items.length == 0 && (
              <div className="flex items-center w-full h-[80vh] flex-col justify-center">
                <Image
                  src={"/images/cart.svg"}
                  alt="empty-cart"
                  width={200}
                  height={200}
                  className="object-cover mx-auto"
                />
                <h3 className="mt-8 text-2xl font-semibold">
                  Your cart is empty
                </h3>
              </div>
            )}
            {items.length > 0 && (
              <div>
                <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                  <div className="col-span-12 md:col-span-7">
                    <p className="font-normal text-lg leading-8 text-gray-400">
                      Product Details
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                      <div className="col-span-3">
                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                          Quantity
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {items?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group"
                    >
                      <div className="w-full md:max-w-[126px]">
                        <Image
                          src={item.images[0]}
                          alt={item.title}
                          width={400}
                          height={400}
                          className="mx-auto rounded-xl object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                        <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <Link href={`/product/product-details/${item.id}`} className="font-semibold text-base leading-7 text-black decoration-1 decoration-sky-300 hover:underline">
                              {item.title}
                            </Link>
                            <h6 className="font-normal text-base leading-7 text-gray-500">
                              {item.category.name}
                            </h6>
                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                              ${item.price}
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full">
                            <button
                              onClick={() => {
                                decreaseItemCart(item.id);
                              }}
                              className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            >
                              <svg
                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                              >
                                <path
                                  d="M16.5 11H5.5"
                                  stroke=""
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M16.5 11H5.5"
                                  stroke=""
                                  strokeOpacity="0.2"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M16.5 11H5.5"
                                  stroke=""
                                  strokeOpacity="0.2"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              readOnly
                              className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                              placeholder={`${item.quantity}`}
                            />
                            <button
                              onClick={() => {
                                increaseItemCart(item);
                              }}
                              className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                            >
                              <svg
                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                              >
                                <path
                                  d="M11 5.5V16.5M16.5 11H5.5"
                                  stroke=""
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M11 5.5V16.5M16.5 11H5.5"
                                  stroke=""
                                  strokeOpacity="0.2"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M11 5.5V16.5M16.5 11H5.5"
                                  stroke=""
                                  strokeOpacity="0.2"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              {items.length == 0 ? (
                <Link
                  href="/"
                  className="text-white cursor-pointer bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                >
                  keep Shopping
                </Link>
              ) : (
                <button
                  onClick={() => {
                    dispatch(clearCart());
                  }}
                  type="button"
                  className="text-white cursor-pointer bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
                >
                  Delete All Cart
                </button>
              )}
            </div>
          </div>
          <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-center pb-6 ">
                <p className="font-semibold text-xl leading-8 text-black">
                  {totalQuantity} Items
                </p>
              </div>
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">
                  Subtotal:
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  ${totalPrice}
                </p>
              </div>
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">
                  Shipping:
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  ${shipping}
                </p>
              </div>
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">Tax:</p>
                <p className="font-medium text-lg leading-8 text-black">
                  ${vat}
                </p>
              </div>
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-indigo-600">
                  Total:
                </p>
                <p className="font-medium text-lg leading-8 text-indigo-600">
                  ${totalPriceWithVat}
                </p>
              </div>
              <form>
                <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                  Shipping
                </label>
                <div className="flex pb-6">
                  <div className="relative w-full">
                    <div className=" absolute left-0 top-0 py-3 px-4">
                      <span className="font-normal text-base text-gray-300">
                        Second Delivery
                      </span>
                    </div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                      placeholder="$5.00"
                    />
                    <button
                      id="dropdown-button"
                      data-target="dropdown-delivery"
                      className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                      type="button"
                    >
                      <svg
                        className="ml-2 my-auto"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="dropdown-delivery"
                      aria-labelledby="dropdown-delivery"
                      className="z-20 hidden divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-10 bg-white right-0"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Shopping
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Images
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            News
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Finance
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Promo Code
                </label>
                <div className="flex pb-4 w-full">
                  <div className="relative w-full ">
                    <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                      placeholder="xxxx xxxx xxxx"
                    />
                    <button
                      id="dropdown-button"
                      data-target="dropdown"
                      className="dropdown-toggle flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0 pl-2 "
                      type="button"
                    >
                      <svg
                        className="ml-2 my-auto"
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                          stroke="#6B7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      className="absolute top-10 right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdown-button"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Shopping
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Images
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            News
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Finance
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200">
                  <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {totalQuantity} Items
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    ${totalPriceWithVat}
                  </p>
                </div>
                {user ? (
                  // <div onClick={handelSuccess}>

                  //   <PayPalButton
                  //   amount={`${totalPriceWithVat}`}
                  //   onSuccess={handelSuccess}
                  // />
                  // </div>
                  <button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
<svg className="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
Check out with PayPal
</button>
                  
                ) : (
                  <Link
                    href={"/sign-up"}
                    className="inline-block w-full py-3 px-6 font-semibold text-lg text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 rounded-lg text-center me-2 mb-2"
                  >
                    Sign In to Checkout
                  </Link>
                )}
                  
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
