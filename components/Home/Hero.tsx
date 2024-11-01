import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-12vh)] flex justify-center flex-col">
      <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="">
          <h1 className="text-xl sm:text:2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold uppercase">
            mega sale <span className="text-rose-600">Special</span> Offer up to{" "}
            <span className="text-orange-500">60%</span> off
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            reprehenderit! Asperiores facilis itaque, iusto eius placeat
            cupiditate, pariatur corporis amet error quo quae sint? Dignissimos
            reiciendis reprehenderit incidunt sint consectetur.
          </p>
          <div className="flex mt-6 items-center gap-4 flex-col sm:flex-row">  
            <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Shop Now</button>
            <button type="button" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">Shopping Now</button>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src={"/images/hero.svg"}
            alt="hero"
            width={600}
            height={600}
            className="xl:w-[80%] lg:w-[60%] "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
