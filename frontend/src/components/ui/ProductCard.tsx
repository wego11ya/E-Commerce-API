"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
            onClick={() => {
              // TODO: Add to cart functionality
              console.log(`Add product ${id} to cart`);
            }}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
