import { Categories } from "@/shared/components/categories";
import { Container } from "@/shared/components/container";
import { Title } from "@/shared/components/title";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All Places" size="lg" className="font-extrabold" />
        <Categories />
      </Container>
    </>
  );
}
