import { Button } from "@/shared/ui/button";
import { FavoriteCard } from "./FavoriteCard";

interface Place {
  id: number;
  userId: number;
  placeId: number;
  place: {
    id: number;
    name: string;
    shortDescription: string;
    slug: string;
    location: string;
    description: string;
    photos: { photoUrl: string }[];
  };
}

interface PlacesListProps {
  items: Place[];
  className?: string;
}

export const FavoritesList: React.FC<PlacesListProps> = ({
  items,
  className,
}) => {
  return (
    <div className={className}>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Favorites</h3>
        <div className="space-y-4">
          {items.map(({ place }) => (
            <FavoriteCard
              key={place.id}
              id={place.id}
              slug={place.slug}
              name={place.name}
              description={place.description}
              imageUrl={place.photos[0]?.photoUrl || "/placeholder.svg"}
            />
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6">
          View All Favorites
        </Button>
      </div>
    </div>
  );
};
