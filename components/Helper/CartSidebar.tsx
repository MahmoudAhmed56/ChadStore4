"use client"
import { CartItem, addItem, removeAllItems, removeItem } from "@/store/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import { useDispatch } from "react-redux";

type Props = {
  items: CartItem[];
};
const CartSidebar = ({ items }: Props) => {
  const dispatch = useDispatch()
  const increaseItemCart = (item:CartItem)=> dispatch(addItem(item));
  const decreaseItemCart = (id:number)=> dispatch(removeItem({id}));
  const removeAllItemsFromCart = (id:number)=> dispatch(removeAllItems({id}));
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) =>total + item.price *item.quantity,0).toFixed(2)
  const vat = (+totalPrice * 0.01).toFixed(2)
  const shipping = Number(4).toFixed(2);
  const totalPriceWithVat = (+totalPrice + +vat + +shipping).toFixed(2)
  return (
    <div className="font-sans mt-3">
      <h2 className="text-center font-bold text-lg mb-6">Your Cart</h2>
      {items.length == 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center ">
          <Image
            src={"/images/cart.svg"}
            alt="empty-cart"
            width={200}
            height={200}
            className="object-cover mx-auto"
          />
          <h3 className="mt-8 text-2xl font-semibold">Your cart is empty</h3>
        </div>
      )}
      {items.length > 0 && (
        <div className="space-y-4 divide-y divide-green-300">
          {items?.map((item) => {
            return (
              <div key={item.id} className="flex flex-col gap-y-4 max-lg:max-w-3xl mx-auto ">
                <div className="lg:col-span-2">
                  <div className="grid md:grid-cols-2 items-center gap-4 py-4 px-4">
                    <div className="col-span-2 flex items-center gap-6">
                      <div className="w-28 h-28 shrink-0">
                        <Image
                          src={item?.images[0]}
                          alt={item?.title}
                          width={130}
                          height={130}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                      <SheetClose asChild >
                        <Link href={`/product/product-details/${item?.id}`} className="text-base font-bold text-gray-800 select-none line-clamp-3 decoration-1 decoration-sky-300 hover:underline">
                        {item?.title}
                        </Link>
                      </SheetClose>
                        <h6 className="text-sm text-gray-500 mt-1">
                          Category:{" "}
                          <span className="ml-0 sm:ml-2 font-semibold">{item?.category?.name}</span>
                        </h6>
                        <h6 className="text-sm text-gray-500 mt-1">
                          Price:{" "}
                          <span className="ml-2 font-semibold">{item?.price}</span>
                        </h6>
                      </div>
                    </div>

                    <div className="flex items-center gap-7 mt-3">
                      <button
                      onClick={()=>{decreaseItemCart(item.id)}}
                        
                        type="button"
                        className="flex items-center justify-center w-5 h-5 outline-none rounded-full
                        bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 124 124"
                        >
                          <path
                            d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                      <span className="font-bold text-sm leading-[18px]">
                        {item?.quantity}
                      </span>
                      <button
                        onClick={()=>{increaseItemCart(item)}}
                        type="button"
                        className="flex items-center justify-center w-5 h-5 outline-none rounded-full
                        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2 fill-white"
                          viewBox="0 0 42 42"
                        >
                          <path
                            d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center mt-3">
                      <h4 className="text-base font-bold text-gray-800 m-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </h4>
                      <svg
                        onClick={()=>{removeAllItemsFromCart(item.id)}}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 cursor-pointer shrink-0 fill-red-500 hover:fill-red-600 ml-auto"
                        viewBox="0 0 320.591 320.591"
                      >
                        <path
                          d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                
              </div>
            );
          })}
          <div className="mt-4 bg-gradient-to-tl from-[#B0EBB4] via-[#BFF6C3] to-[#E0FBE2] p-6 lg:sticky top-0 shadow-md">
                  <ul className="text-gray-800 divide-y divide-gray-300">
                    <li className="flex flex-wrap gap-4 text-sm pb-4 font-semibold">
                      Subtotal <span className="ml-auto">${totalPrice}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                      Shipping <span className="ml-auto">${shipping}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                      Tax <span className="ml-auto">${vat}</span>
                    </li>
                    <li className="flex flex-wrap gap-4 text-sm pt-4 font-bold">
                      Total <span className="ml-auto">${totalPriceWithVat}</span>
                    </li>
                  </ul>

                  
                  <SheetClose asChild >
                    <Link
                    href="/cart"
                    className="mt-8 max-w-md text-sm px-6 py-3 w-full text-white  tracking-wide rounded-lg inline-block text-center
          bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium  me-2 mb-2"
                  >
                    View All Cart
                  </Link>
                  </SheetClose>
                </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
