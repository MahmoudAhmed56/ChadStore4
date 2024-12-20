"use client";
import ProductCard from "@/components/Home/ProductCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { setSearchTerm } from "@/store/productSearch";
// import { useEffect } from "react";

import Pagination from "@/components/All-product/Pagination";
import Image from "next/image";
import { Product } from "@/typy";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Params = {
  searchName: string
}


const SearchBar = () => {
  const params:Params = useParams()
  const searchParams = useSearchParams()

  
  const [search, setSearch] = useState<string>(params.searchName);
  const dispatch = useDispatch();
  const router = useRouter();
  const handelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search) {
      dispatch(setSearchTerm(search));
    router.push(`/search/${search}`);
    }
  };

  const filterProducts = useSelector(
    (state: RootState) => state.search.filterData
  );
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const entries = filterProducts?.slice(start, end);
  return (
    <div>
      <div className="relative flex-1 mx-4">
        <form onSubmit={handelSearch} className="mt-16 max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              onClick={handelSearch}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="pt-16 pb-12 w-4/5 mx-auto">
        {entries?.length > 0 ? (
          <div>
            <h2 className="text-center font-bold text-2xl mb-2">Results</h2>
            {
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {entries.map((product: Product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            }
            <Pagination
              params={`search/${params.searchName}`}
              data={filterProducts}
            />
          </div>
        ) : (
          <Image
            className="mx-auto"
            src={"/images/No_Product_Found.png"}
            alt="No Product Found"
            width={250}
            height={250}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
