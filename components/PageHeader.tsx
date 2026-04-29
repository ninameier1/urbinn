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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-primary/80 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-primary"
        }`}
    >
      <div className="mx-auto flex justify-between items-center px-6 h-14">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/assets/images/inno.png"
            alt="Urban Innovation Logo"
            width={48}
            height={48}
            className="object-contain h-10 w-auto transition-opacity group-hover:opacity-80"
            unoptimized={true}
            priority
          />
        </Link>
        <MainNav />
      </div>
    <Breadcrumb />
    </header>
  );
};

