"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { StarIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { useSession } from "next-auth/react";
type ReviewFormProps = {
  placeId: number;
};

type ReviewFormData = {
  rating: number;
  comment: string;
};

export default function ReviewForm({ placeId }: ReviewFormProps) {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ReviewFormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const rating = watch("rating", 0);
  const { data: session, status } = useSession();

  const onSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/places/${placeId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            placeId,
            userId: Number(session?.user.id),
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send review.");
      }

      reset();
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">Send Review</h3>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setValue("rating", star)}
          />
        ))}
      </div>

      <Textarea
        placeholder="Send your review..."
        {...register("comment")}
        className="mb-3"
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? "Sending..." : "Send review"}
      </Button>
    </div>
  );
}
