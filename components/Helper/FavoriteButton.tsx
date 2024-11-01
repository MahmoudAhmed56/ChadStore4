"use client";
import { HeartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Link from "next/link";

const FavoriteButton = () => {
  const items = useSelector((state: RootState) => state.favorite.items);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <Link href={"/favorite"} className="relative">
      {items.length > 0 && (
        <span className="absolute -top-3 -right-2 w-6 h-6 text-center flex items-center justify-center flex-col text-xs rounded-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl">
          {totalQuantity}
        </span>
      )}

      <HeartIcon size={26} cursor={"pointer"} />
    </Link>
  );
};

export default FavoriteButton;
