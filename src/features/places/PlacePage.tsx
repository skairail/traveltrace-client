"use client";
import { useSession } from "next-auth/react";
import PlaceReviews from "@/features/review/ui/PlaceReviews";
import ReviewForm from "@/features/review/ui/ReviewForm";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import FavoriteButton from "@/features/favorite/ui/FavoriteButton";
import Link from "next/link";

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{place.name}</h1>
        {session && (
          <FavoriteButton placeId={place.id} userId={session.user.id} />
        )}
      </div>

      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-6 h-6 ${
                i < Math.floor(averageRating / place.reviews.length)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-lg text-gray-600">
          {averageRating.toFixed(1)} ({place.reviews.length} reviews)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {place.photos.length > 0 ? (
          place.photos.map(
            (photo: { id: number; photoUrl: string; description: string }) => (
              <div key={photo.id} className="relative">
                <Image
                  src={photo.photoUrl}
                  alt={photo.description}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg"></div>
                <p className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  {photo.description}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-center text-gray-600">No photos available</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Description
        </h2>
        <p className="text-gray-700">{place.description}</p>
      </div>

      <div className="flex items-center mb-6 text-gray-700">
        <p className="mr-4">
          <strong>Coordinates:</strong> {place.latitude}, {place.longitude}
        </p>
        {place.address && (
          <Link
            href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            View on Google Maps
          </Link>
        )}
      </div>

      {place.priceRange && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Price Range</h3>
          <p className="text-gray-700">{place.priceRange}</p>
        </div>
      )}

      <PlaceReviews placeId={place.id} />

      <ReviewForm placeId={place.id} />
    </div>
  );
};

export default PlacePage;
