"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            E-Commerce
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>
            <Link
              href="/cart"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
