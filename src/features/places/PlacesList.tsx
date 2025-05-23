import React from "react";
import { Title } from "@/shared/components/Title";
import { PlaceCard } from "./PlaceCard";

interface Place {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  photos: { photoUrl: string }[];
}

interface Props {
  name: string;
  items: Place[];
  className?: string;
}

export const PlacesList: React.FC<Props> = ({ name, items, className }) => {
  return (
    <div className={className}>
      <Title text={name} size="lg" className="font-extrabold mb-5" />
      <div className="grid grid-cols-3 gap-[50px]">
        {items.map((place) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            slug={place.slug}
            name={place.name}
            shortDescription={place.shortDescription}
            imageUrl={
              place.photos.length > 0
                ? place.photos[0].photoUrl
                : "/placeholder.jpg"
            }
          />
        ))}
      </div>
    </div>
  );
};
