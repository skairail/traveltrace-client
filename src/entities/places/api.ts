import { fetcher } from "@/shared/lib/api";

export interface Place {
  id: number;
  name: string;
  slug: string;
  description: string;
  photos: [];
  imageUrl: string;
}

export async function getPlaces(): Promise<Place[]> {
  return fetcher<Place[]>("/places");
}
