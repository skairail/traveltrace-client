"use client";
import { useEffect, useState } from "react";

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    username: string;
  };
};

interface PlaceReviewsProps {
  placeId: number;
}

export default function PlaceReviews({ placeId }: PlaceReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/places/${placeId}/reviews`
        );
        if (!res.ok) {
          throw new Error("Error loading reviews.");
        }
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (loading) {
    return <p>Reviews loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-3">Place reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <div className="flex items-center mb-2">
                <div className="font-semibold">{review.user.username}</div>
                <div className="ml-2 text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`w-5 h-5 ${
                      star <= review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
