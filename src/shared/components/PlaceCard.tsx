import Link from "next/link";
import React from "react";
import { Title } from "./Title";

interface Props {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  className?: string;
}

export const PlaceCard: React.FC<Props> = ({
  id,
  slug,
  name,
  description,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/places/${slug}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[300px] h-[200px]" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-400">{description}</p>
      </Link>
    </div>
  );
};
