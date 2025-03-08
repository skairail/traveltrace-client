import Image from "next/image";
import Link from "next/link";
import { Star, Calendar } from "lucide-react";

interface FavoriteProps {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  className?: string;
}

export const FavoriteCard: React.FC<FavoriteProps> = ({
  id,
  slug,
  name,
  description,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/places/${slug}`} className="block">
        <div className="flex space-x-4 p-4 border border-gray-200 rounded-lg shadow-sm">
          <div className="flex-shrink-0">
            <Image
              className="w-[150px] h-[100px] object-cover rounded-lg"
              src={imageUrl}
              alt={name}
              width={150}
              height={100}
            />
          </div>
          <div className="flex-grow">
            <h4 className="text-lg font-semibold">{name}</h4>
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Visited June 2023</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
