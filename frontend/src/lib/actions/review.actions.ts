import { Review } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function getReviewsByProductId(
  productId: string
): Promise<Review[]> {
  try {
    const response = await fetch(
      `${baseUrl}/api/products/${productId}/reviews`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const data = await response.json();
    return data.reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}
