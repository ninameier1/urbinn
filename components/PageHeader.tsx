"use client";

import Link from 'next/link';
import Image from "next/image";

import { useEffect, useState } from "react";

import Breadcrumb from './Breadcrumb';


export default function PageHeader({ nav }: { nav: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50
        ${scrolled
          ? "bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-primary"
        }`}>
     
      <div className="mx-auto flex h-16 divide-x divide-secondary">
        <Link href="/" className="flex items-end group ">
          <Image
            src="/assets/images/logo.png"
            alt="GLOW Logo"
            width={0}
            height={0}
            sizes="64px"
            className="h-16 w-auto px-4 object-contain hover:opacity-50 transition-opacity"
            unoptimized
            priority
          />
        </Link>
        
        {nav} 
        
      </div>

    <Breadcrumb />
    
    </header>
  );
};

