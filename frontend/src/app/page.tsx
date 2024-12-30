import ProductCard from "@/components/ui/ProductCard";

// Temporary mock data
const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    price: 99.99,
    description:
      "This is a description for product 1. It's a great product with amazing features.",
    image: "https://picsum.photos/seed/1/400/300",
  },
  {
    id: "2",
    name: "Product 2",
    price: 149.99,
    description:
      "This is a description for product 2. It's another fantastic product you'll love.",
    image: "https://picsum.photos/seed/2/400/300",
  },
  {
    id: "3",
    name: "Product 3",
    price: 199.99,
    description:
      "This is a description for product 3. The best product in our collection.",
    image: "https://picsum.photos/seed/3/400/300",
  },
  // Add more mock products as needed
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
