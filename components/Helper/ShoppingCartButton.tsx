"use client";
import { useSelector } from "react-redux";
import { ShoppingBagIcon } from "lucide-react";
import { RootState } from "@/store/store";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CartSidebar from "./CartSidebar";

const ShoppingCartButton = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          {items.length > 0 && (
            <span className="absolute -top-3 -right-2 w-6 h-6 text-center flex items-center justify-center flex-col text-xs rounded-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
              {totalQuantity}
            </span>
          )}
          <ShoppingBagIcon cursor={"pointer"} size={26} />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-auto h-full w-full sm:min-w-[350px]">
        <CartSidebar items={items} />
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartButton;
