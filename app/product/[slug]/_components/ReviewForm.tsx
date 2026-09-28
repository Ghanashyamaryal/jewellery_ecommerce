"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema } from "@/components/common/ValidationSchema";
import type { NewReview } from "@/lib/reviews";

export function ReviewForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (review: NewReview) => void;
  onCancel: () => void;
}) {
  const [hovered, setHovered] = useState(0);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewReview>({
    resolver: yupResolver(reviewSchema),
    defaultValues: { rating: 0, name: "", comment: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="border border-t-0 border-border p-6 space-y-5"
    >
      <div>
        <Label className="mb-2 block">Your rating *</Label>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <div
              role="radiogroup"
              aria-label="Rating"
              className="flex gap-1"
              onMouseLeave={() => setHovered(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={field.value === value}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  onClick={() => field.onChange(value)}
                  onMouseEnter={() => setHovered(value)}
                  className="p-0.5"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      value <= (hovered || field.value)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        />
        {errors.rating && (
          <p className="text-sm text-destructive mt-1">{errors.rating.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="review-name" className="mb-2 block">
          Your name *
        </Label>
        <Input id="review-name" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="review-comment" className="mb-2 block">
          Your review *
        </Label>
        <Textarea
          id="review-comment"
          rows={4}
          placeholder="How does it look, feel and wear?"
          {...register("comment")}
        />
        {errors.comment && (
          <p className="text-sm text-destructive mt-1">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" className="tracking-widest uppercase">
          Submit Review
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="tracking-widest uppercase">
          Cancel
        </Button>
      </div>
    </form>
  );
}
