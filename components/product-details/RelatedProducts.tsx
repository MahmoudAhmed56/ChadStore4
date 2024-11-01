import { Product } from "@/typy";
import ProductCard from "../Home/ProductCard";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";

// type props = {
//   relatedProduct: Product[];
// };
const RelatedProducts = ({
  relatedProduct,
  categoryName,
}: {
  relatedProduct: Product[];
  categoryName: string;
}) => {
  // { relatedProduct,categoryName }: {relatedProduct:props;categoryName:string}
  return (
    <div>
      <h2 className="text-2xl text-black font-semibold">Related Product</h2>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedProduct.slice(0, 6).map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
      <div className="mx-auto w-fit mb-4">
        {relatedProduct.length > 6 && (
          <Link
            href={`/shop-by-category/${categoryName}`}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-center 
           me-2 mb-2 py-4 px-6 font-semibold text-xl w-full rounded-full flex items-center justify-center mt-3"
          >
            <span className="mr-2 inline-block">All Related Products</span>
            <span className="inline-block">
              <CircleArrowRight />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
