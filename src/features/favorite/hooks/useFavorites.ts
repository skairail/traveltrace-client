import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, addToFavorites } from "../api/favorites";

export function useFavorites(userId: string) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getFavorites(userId),
    staleTime: 1000 * 60 * 5,
  });
}
