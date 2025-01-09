export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  gender: "Men" | "Women" | "Kids";
  category: "hiking" | "skiing" | "climbing" | "running" | "cycling" | "casual";
  variants: Variant[];
  featured: boolean;
  freeShipping: boolean;
  averageRating: number;
  numOfReviews: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  _id: string;
  color: string;
  colorCode: string;
  sizes: Size[];
}

export interface Size {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  inventory: number;
}

export interface Review {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}
