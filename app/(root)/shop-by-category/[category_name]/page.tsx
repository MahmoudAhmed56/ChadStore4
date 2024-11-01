
import { categories, data } from "@/Request/data";
import Pagination from "@/components/All-product/Pagination";
import ProductCard from "@/components/Home/ProductCard";
import { Product, category } from "@/typy";

const ShopByCategory = ({
  searchParams,params
}: {
  searchParams: { [key: string]: string | string[] | undefined },params:{category_name:string}
}) => {
  const categoryName = params.category_name;

  
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";
  const start = (Number(page) - 1) * (Number(per_page));
  const end = start + Number(per_page)

  const singleCategory:category = categories.find((category)=>{
    return category.name == categoryName
  })!
  
  const relatedProduct:Product[] = data.filter((product)=>{
    return product.category.name == singleCategory?.name
  })

  const entries = relatedProduct.slice(start,end)
  return (
    <div className="w-4/5 mx-auto mt-16">
      <h2 className="text-center font-semibold text-xl">{categoryName}</h2>
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {entries.map((entry)=>{
        return(
          <ProductCard product={entry} key={entry.id}  />
        )
      })}
    </div>
      <Pagination params={`shop-by-category/${categoryName}`} data={relatedProduct} />
  </div>
  )
}

export default ShopByCategory