"use client";
import { comingSoon } from "../../public";
import Image from "next/image";

export default function ComingSoon() {

  return ( 
    <div className="w-full flex flex-col items-center justify-center h-full">
      <h1>Coming Soon</h1>
      <Image width={500} height={500} alt="comming soon" src={comingSoon}/>
    </div>
  );
}
