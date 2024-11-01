"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SearchBox = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon size={26} cursor={"pointer"} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className=" items-center ">
            <Input
              id="name"
              placeholder="Search"
              className="block w-full"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={() => {
                if (search) {
                  router.push(`/search/${search}`);
                }
              }}
              className={`text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 select-none font-medium rounded-lg
                text-sm px-5 py-2.5 text-center inline-block ${
                  search ? "" : "opacity-50 cursor-no-drop"
                }`}
              type="submit"
            >
              Search
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBox;
