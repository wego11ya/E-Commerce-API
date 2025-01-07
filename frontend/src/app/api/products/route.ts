import { NextResponse } from "next/server";

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 3
) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);

      if (response.status === 429) {
        // Get retry-after header or use exponential backoff
        const retryAfterHeader = response.headers.get("retry-after");
        const retryAfter = retryAfterHeader
          ? parseInt(retryAfterHeader, 10)
          : Math.pow(2, i);
        console.log(
          `Rate limited. Waiting ${retryAfter} seconds before retry...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
      if (i === maxRetries - 1) throw error;

      // Wait before retrying (exponential backoff)
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000)
      );
    }
  }
  throw lastError;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gender = searchParams.get("gender");

  if (!gender) {
    return NextResponse.json(
      { error: "Gender parameter is required" },
      { status: 400 }
    );
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products?gender=${gender}`;

  try {
    const response = await fetchWithRetry(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Response Error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.products) {
      console.error("Unexpected API response format:", data);
      return NextResponse.json(
        {
          products: [],
          count: 0,
          ratingCounts: {},
          error: "Invalid response from backend",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      products: data.products,
      count: data.count || 0,
      ratingCounts: data.ratingCounts || {},
    });
  } catch (error) {
    console.error("Error fetching products:", {
      error,
      apiUrl,
      env: process.env.NEXT_PUBLIC_API_URL,
    });
    return NextResponse.json(
      {
        products: [],
        count: 0,
        ratingCounts: {},
        error:
          error instanceof Error ? error.message : "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}
