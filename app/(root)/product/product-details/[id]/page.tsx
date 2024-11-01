import { data } from "@/Request/data"
import ProductDetailsUp from "@/components/product-details/ProductDetailsUp"
import RelatedProducts from "@/components/product-details/RelatedProducts"
import { Product } from "@/typy"

const ProductDetails = async({params}:{params:{id:string}}) => {
  const id = params.id
  // const singleProduct:Product = await getSingleProduct(id)

  const singleProduct:Product = data.find((product)=>{
    return product.id == Number(id)
  })!
  
  // const relatedProduct:Product[] = await getProductByCategory(singleProduct.category.id)
  const relatedProduct:Product[] = data.filter((product)=>{
    return product.category.id == singleProduct?.category.id
  })

  
  
  
  
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <ProductDetailsUp product={singleProduct} />
      <RelatedProducts relatedProduct={relatedProduct} categoryName={singleProduct?.category.name} />
    </div>
  )
}

export default ProductDetails