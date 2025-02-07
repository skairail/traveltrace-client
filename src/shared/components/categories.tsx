import React from "react";
import { categoriesApi } from "../api/categoriesApi";
import { cn } from "../lib/utils";

interface Props {
  className?: string;
}
const activeIndex = 0;
export const Categories: React.FC<Props> = async ({ className }) => {
  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {(await categoriesApi()).map((cat, index) => (
        <a
          className={cn(
            "flex items-center h-11 font-bold px-5 rounded-2xl",
            activeIndex === index &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={index}
        >
          <button>{cat}</button>
        </a>
      ))}
    </div>
  );
};
