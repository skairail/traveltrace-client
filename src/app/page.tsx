import { getPlaces } from "@/entities/places/api";
import { Container } from "@/layout/Container";
import { Title } from "@/shared/components/Title";
import HomeClient from "./HomeClient";

export default async function Home() {
  const places = await getPlaces();

  return (
    <>
      <Container className="mt-10">
        <Title text="All Places" size="lg" className="font-extrabold" />
      </Container>
      <HomeClient places={places} />{" "}
    </>
  );
}
