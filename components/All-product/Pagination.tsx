"use client";


import { Pagination as Pagination2 } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Pagination({params,data}:{params:string;
  data: {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
        id: number;
        name: string;
        image: string;
    };
}[]}) {

  
  const router: any = useRouter();
  const searchParams: any = useSearchParams();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div>
      <div className="overflow-x-auto justify-center my-6 hidden sm:flex">
        <Pagination2
          className="select-none"
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / Number(per_page))}
          onPageChange={(page) => {
            onPageChange(page);
            router.push(`/${params}/?page=${Number(page)}&per_page=${per_page}`);
          }}
          showIcons
        />
      </div>
      <div className="flex overflow-x-auto justify-center my-6 sm:hidden">
        <Pagination2
          className="select-none"
          layout="navigation"
          currentPage={currentPage}
          totalPages={Math.ceil(data.length / Number(per_page))}
          onPageChange={(page) => {
            onPageChange(page);
            router.push(`/${params}/?page=${Number(page)}&per_page=${per_page}`);
          }}
          showIcons
        />
      </div>
    </div>
  );
}
