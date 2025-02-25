"use client";
import { useSession } from "next-auth/react";
import PlaceReviews from "@/features/review/ui/PlaceReviews";
import ReviewForm from "@/features/review/ui/ReviewForm";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import FavoriteButton from "@/features/favorite/ui/FavoriteButton";

const PlacePage = ({
  place,
  averageRating,
}: {
  place: any;
  averageRating: number;
}) => {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{place.name}</h1>

      {session && (
        <FavoriteButton placeId={place.id} userId={session.user.id} />
      )}
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
      </div>

      <div className="mb-8">
        {place.photos.length > 0 ? (
          place.photos.map(
            (photo: { id: number; photoUrl: string; description: string }) => (
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
};

export default PlacePage;
