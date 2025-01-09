"use client";

import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CartPanel() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-semibold text-black">CART</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-black">
              <ShoppingBag className="w-16 h-16 mb-4" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}-${item.size}`}
                  className="flex gap-4 py-4 border-b"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-black">{item.name}</h3>
                        <p className="text-sm text-black">{item.gender}</p>
                      </div>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.productId,
                            item.variantId,
                            item.size
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-black" />
                      </button>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: item.colorCode }}
                        />
                        <span className="text-sm text-black">{item.color}</span>
                      </div>
                      <p className="text-sm text-black">Size: {item.size}</p>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.size,
                              item.amount - 1
                            )
                          }
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4 text-black" />
                        </button>
                        <span className="px-4 text-black">{item.amount}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variantId,
                              item.size,
                              item.amount + 1
                            )
                          }
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4 text-black" />
                        </button>
                      </div>
                      <p className="font-medium text-black">
                        {formatPrice(item.price * item.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 space-y-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="font-medium text-black">Subtotal</span>
              <span className="font-medium text-black">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">excl. Shipping costs</p>
          </div>
          <Button
            className="w-full h-12 text-base font-normal bg-black text-white hover:bg-black/90"
            disabled={cartItems.length === 0}
          >
            CHECK OUT
          </Button>
        </div>
      </div>
    </>
  );
}
