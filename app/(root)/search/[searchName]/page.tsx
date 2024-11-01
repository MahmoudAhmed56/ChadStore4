"use client";
import ProductCard from "@/components/Home/ProductCard";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { setSearchTerm } from "@/store/productSearch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SearchBar from "../_components/SearchBar";
import Pagination from "@/components/All-product/Pagination";
import Image from "next/image";
const Search = ({
  params,
  searchParams,
}: {
  params: { searchName: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const filterProducts = useSelector(
    (state: RootState) => state.search.filterData
  );
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";
  const start = (Number(page) - 1) * (Number(per_page));
  const end = start + Number(per_page)
  const entries = filterProducts.slice(start,end)


  const dispatch = useDispatch();

  
  // onChange={(e) => {
  //   setSearch(e.target.value);
  // }}

  // onSubmit={handelSearch}
  useEffect(() => {
    dispatch(setSearchTerm(params.searchName));
  }, []);

  return (
    <div>
      <div className="relative flex-1 mx-4">
        <SearchBar searchName={params.searchName} />
      </div>

      <div className="pt-16 pb-12 w-4/5 mx-auto">
        {entries.length > 0 ? 
        ( <div>
          <h2 className="text-center font-bold text-2xl mb-2">Results</h2>
          {
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {entries?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
          }
          <Pagination params={`search/${params.searchName}`} data={filterProducts} />
      </div>)
        :
        (
          <Image className="mx-auto" src={"/images/No_Product_Found.png"} alt="No Product Found" width={250} height={250} />
        )
      }
      </div>
    </div>
  );
};

export default Search;
