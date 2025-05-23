"use client";

import { useState } from "react";
import { Categories } from "@/features/filter/Categories";
import { SortPopup } from "@/features/filter/SortPopup";
import { Container } from "@/layout/Container";
import { PlacesList } from "@/features/places/PlacesList";
import { Map } from "@/shared/components/Map";

interface Props {
  places: any[];
}

export default function HomeClient({ places }: Props) {
  const [category, setCategory] = useState<string | null>(null);

  const filteredPlaces = category
    ? places.filter((place) => place.category.name === category)
    : places;

  return (
    <div>
      <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10">
        <Container className="flex items-center justify-between">
          <Categories onSelectCategory={setCategory} />
          <SortPopup />
        </Container>
      </div>
      <Map></Map>
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
