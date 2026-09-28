import type { Ratings } from "@/types/catalog";

export interface Review {
  id: string;
  productId: string;
  rating: number;
  name: string;
  comment: string;
  createdAt: string;
}

export type NewReview = Pick<Review, "rating" | "name" | "comment">;

export const REVIEWS_KEY = "reviews";

export function combineRatings(base: Ratings, reviews: Review[]): Ratings {
  const count = base.count + reviews.length;
  if (count === 0) return { average: 0, count: 0 };
  const total = base.average * base.count + reviews.reduce((sum, r) => sum + r.rating, 0);
  return { average: total / count, count };
}

export function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
