"use client";

import { useState } from "react";
import { MessageCircle, Star } from "lucide-react";
import { toast } from "sonner";
import type { Ratings } from "@/types/catalog";
import { useProductReviews } from "@/hooks/use-product-reviews";
import { combineRatings, formatReviewDate, type NewReview } from "@/lib/reviews";
import { ReviewForm } from "./ReviewForm";

function Stars({ value, className }: { value: number; className: string }) {
  return (
    <div className="flex gap-1" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < Math.round(value) ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/40"
          }`}
        />
      ))}
    </div>
  );
}

export function ProductReviews({ productId, ratings }: { productId: string; ratings: Ratings }) {
  const { reviews, addReview } = useProductReviews(productId);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { average, count } = combineRatings(ratings, reviews);

  const submit = (review: NewReview) => {
    addReview(review);
    setIsFormOpen(false);
    toast.success("Thank you! Your review has been added.");
  };

  return (
    <section id="reviews" className="scroll-mt-28 max-w-3xl mx-auto mb-16">
      <h2 className="text-2xl md:text-3xl font-serif mb-6">Customer Reviews</h2>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-border p-6">
        {count > 0 ? (
          <div className="flex items-center gap-4">
            <p className="text-5xl font-serif">{average.toFixed(1)}</p>
            <div>
              <Stars value={average} className="h-5 w-5" />
              <p className="text-sm text-muted-foreground mt-1">
                Based on {count} {count === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <p className="font-serif text-lg">No reviews yet</p>
            <p className="text-sm text-muted-foreground">
              Own this piece? Be the first to tell others about it.
            </p>
          </div>
        )}
        {!isFormOpen && (
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 border border-foreground text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Write a Review
          </button>
        )}
      </div>

      {isFormOpen && <ReviewForm onSubmit={submit} onCancel={() => setIsFormOpen(false)} />}

      {reviews.length > 0 && (
        <ul className="divide-y divide-border mt-8">
          {reviews.map((review) => (
            <li key={review.id} className="py-6">
              <div className="flex items-center justify-between gap-4 mb-2">
                <Stars value={review.rating} className="h-4 w-4" />
                <time dateTime={review.createdAt} className="text-sm text-muted-foreground">
                  {formatReviewDate(review.createdAt)}
                </time>
              </div>
              <p className="font-medium mb-1">{review.name}</p>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
