export type category={
  id: number;
  name: string;
  image: string,
  }
export type Product = {
  id:number;
  title:string;
  price:number;
  images: string[]
  description:string;
  // image: string;
  category: category
}
