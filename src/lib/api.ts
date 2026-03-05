/**
 * lib/api.ts
 * All HTTP calls to Express backend.
 * next.config.ts rewrites /api/* → http://localhost:5000/api/*
 */
import axios, { AxiosError } from "axios";
import type { MovieApiResponse, SentimentApiResponse } from "@/types";

const http = axios.create({ baseURL: "/api", timeout: 20_000 });

/** Step 1 — GET /api/movie?id=tt0133093 */
export async function fetchMovie(imdbId: string): Promise<MovieApiResponse> {
  const { data } = await http.get<MovieApiResponse>("/movie", {
    params: { id: imdbId.trim() },
  });
  return data;
}

/** Step 2 — GET /api/sentiment?id=tt0133093 — called on button click only */
export async function fetchSentiment(
  imdbId: string,
): Promise<SentimentApiResponse> {
  const { data } = await http.get<SentimentApiResponse>("/sentiment", {
    params: { id: imdbId.trim() },
  });
  return data;
}

export function extractError(err: unknown): string {
  if (err instanceof AxiosError)
    return (
      (err.response?.data as { error?: string })?.error ??
      err.message ??
      "Unexpected error."
    );
  if (err instanceof Error) return err.message;
  return "Unexpected error.";
}

export const isValidImdbId = (id: string) => /^tt\d{7,8}$/.test(id.trim());
