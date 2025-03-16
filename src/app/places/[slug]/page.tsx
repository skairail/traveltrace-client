import PlacePage from "@/features/places/PlacePage";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const placeData = await fetchPlaceData(slug);

  return (
    <PlacePage
      place={placeData.place}
      averageRating={placeData.averageRating}
    />
  );
};

async function fetchPlaceData(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/places/${slug}`);
  const place = await res.json();

  const averageRating = place.reviews.reduce(
    (total: any, review: { rating: any }) => total + review.rating,
    0
  );

  return { place, averageRating };
}

export default Page;
