import { useState } from "react";
import { addToFavorites } from "../api/addToFavorites";

interface FavoriteButtonProps {
  placeId: number;
  userId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ placeId, userId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = async () => {
    try {
      await addToFavorites(placeId, userId);
      setIsFavorite(true);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      alert("Failed to add to favorites. Try again later.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md text-white ${
        isFavorite ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
      }`}
      disabled={isFavorite}
    >
      {isFavorite ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
