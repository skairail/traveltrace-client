import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/shared/ui/input";

interface Place {
  id: number;
  name: string;
  slug: string;
  photos: { photoUrl: string }[];
}

const SearchInput: React.FC<{ onQueryChange: (query: string) => void }> = ({
  onQueryChange,
}) => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      onChange={(e) => onQueryChange(e.target.value)}
      className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
    />
  );
};

const SearchResults: React.FC<{ results: Place[] }> = ({ results }) => {
  if (results.length === 0) return null;
  return (
    <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden">
      {results.map((place) => (
        <li
          key={place.id}
          className="flex items-center p-3 hover:bg-gray-100 transition cursor-pointer"
        >
          <Link
            href={`/places/${place.slug}`}
            className="flex items-center gap-3 w-full"
          >
            <Image
              src={place.photos[0]?.photoUrl || "/placeholder.svg"}
              alt={place.name}
              width={50}
              height={50}
              className="w-12 h-12 rounded-md object-cover"
            />
            <span className="text-gray-800 font-medium">{place.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useDebouncedCallback(async (q: string) => {
    if (!q) return setResults([]);
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/places/search?q=${q}`
      );
      if (!res.ok) throw new Error("Failed to fetch places");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Error fetching places");
    } finally {
      setIsLoading(false);
    }
  }, 300);

  return (
    <div className="relative w-80">
      <SearchInput
        onQueryChange={(q) => {
          setQuery(q);
          fetchPlaces(q);
        }}
      />
      {isLoading && (
        <div className="absolute z-50 mt-2 w-full bg-white text-center">
          Loading...
        </div>
      )}
      {error && (
        <div className="absolute z-50 mt-2 w-full bg-white text-red-500 text-center">
          {error}
        </div>
      )}
      <SearchResults results={results} />
    </div>
  );
}
