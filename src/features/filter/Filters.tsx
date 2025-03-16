"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../shared/ui/button";
import { MapPin } from "lucide-react";
import { Container } from "../../layout/Container";
import { Categories } from "./Categories";
import { useState } from "react";
import { SortPopup } from "@/features/filter/SortPopup";

interface Props {
  className?: string;
}
export const Filters: React.FC<Props> = ({ className }) => {
  const [category, setCategory] = useState<string | null>(null);
  return (
    <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
      <Container className="flex items-center justify-between">
        <Categories onSelectCategory={setCategory} />
        <SortPopup />
      </Container>
    </div>
  );
};
