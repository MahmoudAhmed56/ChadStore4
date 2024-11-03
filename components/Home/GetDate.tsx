"use client"

import { useEffect, useState } from "react";

const GetDate = () => {
  const d = new Date();
  const year = d.getFullYear()
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <p className='text-sm text-gray-200 md:ml-auto'>© Chad Store {isClient ? year : "..."}. All rights reserved.</p>
  )
}

export default GetDate