import Pagination from "@/components/All-product/Pagination";

import { data } from "../../../Request/data";
import ProductCard from "@/components/Home/ProductCard";

const AllProducts = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";
  const start = (Number(page) - 1) * (Number(per_page));
  const end = start + Number(per_page)
  const entries = data.slice(start,end)
  return (
    <div>
      <div className="w-4/5 mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {entries.map((entry)=>{
          return(
            <ProductCard product={entry} key={entry.id}  />
          )
        })}
      </div>
        <Pagination params={"all-products"} data={data} />
    </div>
  );
};

export default AllProducts;
