import { Product } from "@/typy";
import "./ProductDetailsUp.css";
import ImageGallery from "../product/ImageGallery";
import { Button } from "../ui/button";
import { Star, Truck } from "lucide-react";
import AddToCart from "./AddToCart";
import AddToFavorite from "./AddToFavorite";
type props = {
  product: Product;
};
const ProductDetailsUp = ({ product }: props) => {
  return (
    <div className="bg-white my-7">
      <div className="">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={product.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.category.name}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.title}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${product.price + Math.floor(product.price * 0.1)}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5 flex-col sm:flex-row">
              <AddToCart product={product} />
              <AddToFavorite product={product} />
            </div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsUp;
