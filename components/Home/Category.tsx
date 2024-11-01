import { categories } from "@/Request/data";
import Link from "next/link";

// import { getAllCategory } from "@/Request/request"
interface Category{
  id: Number;
  name: String;
  image: String;
}
const Category = async () => {
  // const categories:Category[] = await getAllCategory()
  
  
  return (
    <div className="pt-16 pb-12">
      <h1 className="text-center font-bold text-2xl capitalize">shop by category</h1>
      <div className="mt-12 w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.slice(0,6).map((category)=>{
          return(
            <Link href={`/shop-by-category/${category.name}`}>
            <div key={category.id.toString()} className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md">
              <h2 className="text-sm sm:text-base md:text-lg capitalize font-bold">{category.name}</h2>
            </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Category