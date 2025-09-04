const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("Falha na requisição");
  return res.json();
}
