import { cache } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const isServer = typeof window === "undefined";

export const getFavorites = cache(async (userId: string) => {
  console.log(userId);
  if (isServer) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favorites/${userId}`,
      {
        credentials: "include",
      }
    );
    return res.json();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/favorites/${userId}`,
      {
        credentials: "include",
      }
    );
    return res.json();
  }
});

export const addToFavorites = async (placeId: number, userId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId, userId }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to add to favorites: ${res.status} ${res.statusText}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding to favorites:", error);
    throw error;
  }
};
