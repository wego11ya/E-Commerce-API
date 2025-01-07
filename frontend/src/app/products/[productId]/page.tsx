import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { getProductById } from "@/lib/actions/product.actions";
import { getReviewsByProductId } from "@/lib/actions/review.actions";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.productId);
  const reviews = await getReviewsByProductId(resolvedParams.productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Upper Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <h1 className="text-3xl font-bold text-black">{product.name}</h1>
              <p className="text-2xl font-semibold text-black">
                {formatPrice(product.price)}
              </p>
              <p className="text-gray-600">{product.description}</p>

              {/* Colors */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Colors
                </h3>
                <div className="flex gap-3">
                  {product.variants.map((variant, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded-full border-2 border-gray-200 cursor-pointer hover:border-black transition-colors"
                      style={{ backgroundColor: variant.colorCode }}
                      title={variant.color}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-3 text-black">Sizes</h3>
                <div className="flex gap-3">
                  {product.variants[0]?.sizes.map((sizeObj, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-14 h-14 text-lg bg-gray-100 text-black hover:bg-black hover:text-white border-0"
                    >
                      {sizeObj.size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <Button className="w-full h-14 text-base font-normal bg-black text-white hover:bg-black/90">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  ADD TO MY CART
                </Button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-black">Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={product.averageRating} />
                <span className="text-black">
                  ({product.numOfReviews} reviews)
                </span>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="font-semibold text-black">
                      {review.title}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
