/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetcherOptions = {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
};

export async function fetcher(endpoint: string, options?: FetcherOptions) {
  const url = `${BASE_URL}${endpoint}`;
  const method = options?.method || "GET";
  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

const body = options?.body ? JSON.stringify(options.body) : undefined;

const res = await fetch(url, { method, headers, body });

if (!res.ok) {
  let errorBody;
  try {
    errorBody = await res.json();
  } catch {
    errorBody = { status: res.status, title: res.statusText, detail: "Erro desconhecido" };
  }
  throw errorBody; 
}
  return res.json();
}
