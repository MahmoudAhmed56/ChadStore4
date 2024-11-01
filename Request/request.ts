export async function getAllCategory() {
  const categoryRes = await fetch("https://api.escuelajs.co/api/v1/categories");
  return categoryRes.json();
}

export async function getAllProduct() {
  const productRes = await fetch("https://api.escuelajs.co/api/v1/products");
  // const productRes = await fetch("https://fakestoreapi.in/api/products");
  return productRes.json();
}

export async function getSingleProduct(id: string) {
  const singleProductRes = await fetch(
    `https://api.escuelajs.co/api/v1/products/${id}`
  );
  // const singleProductRes = await fetch(`https://fakestoreapi.in/api/products/${id}`);
  return singleProductRes.json();
}

export async function getProductByCategory(categoryId: number) {
  const productByCategory = await fetch(
    `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
  );
  return productByCategory.json();
}



import {data} from "./data"
const data2 = data.map((item)=> {return item})
// console.log(data[0]);
const url = "https://api.escuelajs.co/api/v1/products/";

const oo = {
  "title": "mo",
  "price": 10,
  "description": "A description",
  "categoryId": 1,
  "images": ["https://placeimg.com/640/480/any"]
}




const mm = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
    body: JSON.stringify({
      "title": "jjjj",
      "price": 10,
      "description": "A description",
      "categoryId": 1,
      "images": ["https://placeimg.com/640/480/any"]
    }),
    headers: myHeaders,
  });
}

mm()