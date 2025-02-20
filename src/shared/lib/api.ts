export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}
