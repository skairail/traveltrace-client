import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

interface Props {
  className?: string;
}

export const Map: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={`relative h-64 max-w-6xl mt-8  max-w-md mx-auto bg-blue-50 rounded-lg overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-50">
        <Image src="/map.svg" alt="World Map" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Link href={"/map"}>
          <Button className="bg-white text-black hover:bg-gray-100 shadow-lg flex gap-2">
            <MapPin className="h-4 w-4" />
            <span>View on Map</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
