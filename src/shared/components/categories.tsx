import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { categoriesApi } from "../api/categoriesApi";

interface Props {
  className?: string;
  onSelectCategory: (category: string | null) => void;
}

export const Categories: React.FC<Props> = ({
  className,
  onSelectCategory,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const data = await categoriesApi();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    onSelectCategory(newCategory);
  };

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((cat, index) => (
        <button
          key={index}
          onClick={() => handleCategoryClick(cat)}
          className={cn(
            "flex items-center h-11 font-bold px-5 rounded-2xl",
            activeCategory === cat &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
