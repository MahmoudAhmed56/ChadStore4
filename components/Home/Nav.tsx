import Link from "next/link";
import SearchBox from "../Helper/SearchBox";
import { UserIcon } from "lucide-react";
import ShoppingCartButton from "../Helper/ShoppingCartButton";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import FavoriteButton from "../Helper/FavoriteButton";
import Logo from "../Helper/Logo";

const Nav = () => {
  return (
    <div className="bg-[#DBE2EF] h-[12vh] sticky top-0 z-[20] shadow-md">
      <div className="flex items-center justify-between w-[95%] md:w-4/5 mx-auto h-full">
        <Link href={"/"}>
          <Logo width={100} height={100} />
        </Link>
        <div className="flex items-center space-x-6">
          <SearchBox />
          
          <FavoriteButton/>
          <ShoppingCartButton />
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <UserIcon size={26} cursor={"pointer"} />
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Nav;
