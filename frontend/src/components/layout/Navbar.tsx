"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.amount,
    0
  );

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative w-52 h-12">
            <Image
              src="/images/logo/THE EAST FACE LOGO.png"
              alt="The East Face"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Log Out
            </button>
            <Link
              href="/auth/login"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <User className="w-6 h-6 text-gray-700" />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
