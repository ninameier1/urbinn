"use client";

import Link from 'next/link';
import Image from "next/image";

import { useEffect, useState } from "react";

import MainNav from './MainNav';
import Breadcrumb from './Breadcrumb';


export default function PageHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-primary"
        }`}>

      <div className="mx-auto flex justify-between items-end h-16">
        <Link href="/" className="flex items-end group ">
          <Image
            src="/assets/images/tree.png"
            alt="Urban Innovation Logo"
            width={64}
            height={64}
            className="object-contain h-16 px-4 w-auto hover:opacity-50 transition-opacity"
            unoptimized={true}
            priority
          />
          {/* <p className="text-white/80 text-sm tracking-tight py-1">
            GEZONDE LEEFOMGEVING
          </p> */}
        </Link>
        
        <MainNav />
      </div>
    
    <Breadcrumb />
    
    </header>
  );
};

