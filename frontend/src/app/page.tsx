"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      {/* Hero Section with Tagline */}
      <section className="w-full relative h-[30vh] bg-black pt-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 space-y-2">
          <h1 className="text-4xl font-bold">Explore Your Outdoor Jackets</h1>
          <p className="text-lg max-w-3xl">
            Discover our premium collection of outdoor jackets designed for
            every adventure. From mountain peaks to urban streets, our jackets
            combine style, durability, and cutting-edge technology to keep you
            comfortable in any weather condition.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full max-w-7xl mx-auto py-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Men Category */}
          <Link href="/gender/men" className="relative group cursor-pointer">
            <div className="relative h-[500px] w-full">
              <Image
                src="/images/categories/men.png"
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-2xl font-semibold text-center">Men</h3>
            </div>
          </Link>

          {/* Women Category */}
          <Link href="/gender/women" className="relative group cursor-pointer">
            <div className="relative h-[500px] w-full">
              <Image
                src="/images/categories/women.jpg"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-2xl font-semibold text-center">Women</h3>
            </div>
          </Link>

          {/* Kids Category */}
          <Link href="/gender/kids" className="relative group cursor-pointer">
            <div className="relative h-[500px] w-full">
              <Image
                src="/images/categories/kids.png"
                alt="Kids' Collection"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="text-2xl font-semibold text-center">Kids</h3>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
