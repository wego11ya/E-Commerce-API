"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gender: string;
  category: string;
  featured: boolean;
  averageRating: number;
  numOfReviews: number;
}

interface FilterState {
  category: string | null;
  rating: number | null;
  featured: boolean;
}

interface ApiResponse {
  products: Product[];
  count: number;
  ratingCounts: {
    [key: number]: number;
  };
}

export default function GenderPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const resolvedParams = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    rating: null,
    featured: false,
  });
  const [categories, setCategories] = useState<{ [key: string]: number }>({});
  const [ratingCounts, setRatingCounts] = useState<{ [key: number]: number }>(
    {}
  );
  const [featuredCount, setFeaturedCount] = useState(0);

  const capitalizedGender =
    resolvedParams.gender.charAt(0).toUpperCase() +
    resolvedParams.gender.slice(1).toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?gender=${capitalizedGender}`
        );
        const data: ApiResponse = await response.json();
        setProducts(data.products);

        // Calculate category counts
        const catCounts = data.products.reduce(
          (acc: { [key: string]: number }, product: Product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
          },
          {}
        );
        setCategories(catCounts);

        // Use rating counts from API
        setRatingCounts(data.ratingCounts);

        // Calculate featured count
        const featCount = data.products.filter(
          (p: Product) => p.featured
        ).length;
        setFeaturedCount(featCount);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [capitalizedGender]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      !filters.category || product.category === filters.category;
    const ratingMatch =
      !filters.rating || Math.floor(product.averageRating) === filters.rating;
    const featuredMatch = !filters.featured || product.featured;
    return categoryMatch && ratingMatch && featuredMatch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64">
            <div className="space-y-6 sticky top-24">
              {/* Category Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-black">Category</h3>
                {Object.entries(categories).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() =>
                      setFilters((prev) => ({
                        category: prev.category === category ? null : category,
                        rating: null,
                        featured: false,
                      }))
                    }
                    className={`block w-full text-left px-2 py-1 rounded ${
                      filters.category === category
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)} (
                    {count})
                  </button>
                ))}
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-black">Rating</h3>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setFilters((prev) => ({
                        category: null,
                        rating: prev.rating === rating ? null : rating,
                        featured: false,
                      }))
                    }
                    className={`block w-full text-left px-2 py-1 rounded ${
                      filters.rating === rating
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex">{renderStars(rating)}</div>
                      <span>({ratingCounts[rating] || 0})</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Featured Filter */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-black">Featured</h3>
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      category: null,
                      rating: null,
                      featured: !prev.featured,
                    }))
                  }
                  className={`block w-full text-left px-2 py-1 rounded ${
                    filters.featured
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  Featured Products ({featuredCount})
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group">
                  <div className="relative aspect-square mb-2 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-black">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(Math.floor(product.averageRating))}
                    <span className="text-sm text-black">
                      ({product.numOfReviews})
                    </span>
                  </div>
                  <p className="font-bold text-black">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
