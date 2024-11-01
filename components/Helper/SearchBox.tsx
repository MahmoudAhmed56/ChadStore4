"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setSearchTerm } from "@/store/productSearch";

// import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
const SearchBox = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon size={26} cursor={"pointer"} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4 py-4">
          <div className=" items-center ">
            <input
              id="name"
              placeholder="Search"
              className="flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
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
                  dispatch(setSearchTerm(search));
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
