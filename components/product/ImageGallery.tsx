"use client";
import Image from "next/image";
// import { type } from "os";
import { useState } from "react";

type iAppProps = string[]

const ImageGallery = ({ images }: {images:iAppProps}) => {
  console.log(images);
  
  const [bigImage, setBigImage] = useState<string>(images[0]);

  const handleSmallImageClick = (image: string) => {
    setBigImage(image);
  };
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="order-last flex gap-4 lg:order-none lg:flex-col">
          {images.map((image: string, idx: number) => (
            <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={image}
                width={200}
                height={200}
                alt="photo"
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleSmallImageClick(image)}
              />
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
          <Image
            src={bigImage}
            alt="Photo"
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
          />

          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            Sale
          </span>
        </div>
      </div>

      {/* <Skeleton /> */}
    </div>
  );
};

export default ImageGallery;
//
