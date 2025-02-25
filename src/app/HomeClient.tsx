"use client";

import { useState } from "react";
import { Categories } from "@/shared/components/categories";
import { SortPopup } from "@/shared/components/SortPopup";
import { Container } from "@/shared/components/Container";
import { PlacesList } from "@/shared/components/PlacesList";

interface Props {
  places: any[];
}

export default function HomeClient({ places }: Props) {
  const [category, setCategory] = useState<string | null>(null);

  const filteredPlaces = category
    ? places.filter((place) => place.category.name === category)
    : places;

  return (
    <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
      <Container className="flex items-center justify-between">
        <Categories onSelectCategory={setCategory} />
        <SortPopup />
      </Container>
      <Container>
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <PlacesList items={filteredPlaces} name={""} />
          </div>
        </div>
      </Container>
    </div>
  );
}
