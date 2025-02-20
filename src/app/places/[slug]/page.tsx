import PlaceReviews from "@/features/review/ui/PlaceReviews";
import ReviewForm from "@/features/review/ui/ReviewForm";
import React from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";

const PlacePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/places/${slug}`
    );

    const place = await res.json();
    const averageRating = place.reviews.reduce(
      (total: any, review: { rating: any }) => total + review.rating,
      0
    );
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{place.name}</h1>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(averageRating / place.reviews.length)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600"></span>
        </div>

        <div className="mb-8">
          {place.photos.length > 0 ? (
            place.photos.map(
              (photo: {
                id: number;
                photoUrl: string;
                description: string;
              }) => (
                <div key={photo.id} className="mb-4">
                  <Image
                    src={photo.photoUrl}
                    alt={photo.description}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              )
            )
          ) : (
            <p>No photos available</p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{place.description}</p>
        </div>

        <p className="mb-4">
          Coordinates: {place.latitude}, {place.longitude}
        </p>

        <PlaceReviews placeId={place.id} />
        <ReviewForm placeId={place.id} />
      </div>
    );
  } catch (error: any) {
    return <div>{error.message}</div>;
  }
};

export default PlacePage;
