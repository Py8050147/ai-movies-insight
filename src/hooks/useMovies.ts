"use client";

import { useState, useCallback } from "react";
import { fetchMovie, fetchSentiment, extractError } from "@/lib/api";
import type { Movie, Sentiment, FetchState } from "@/types";

interface UseMovieReturn {
  movie: Movie | null;
  movieState: FetchState;
  movieError: string | null;
  sentiment: Sentiment | null;
  sentimentState: FetchState;
  sentimentError: string | null;
  searchMovie: (id: string) => Promise<void>;
  loadSentiment: () => Promise<void>;
  reset: () => void;
}

export function useMovie(): UseMovieReturn {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [movieState, setMovieState] = useState<FetchState>("idle");
  const [movieError, setMovieError] = useState<string | null>(null);
  const [sentiment, setSentiment] = useState<Sentiment | null>(null);
  const [sentimentState, setSentimentState] = useState<FetchState>("idle");
  const [sentimentError, setSentimentError] = useState<string | null>(null);

  const searchMovie = useCallback(async (id: string) => {
    setMovieState("loading");
    setMovieError(null);
    setMovie(null);
    setSentiment(null);
    setSentimentState("idle");
    setSentimentError(null);
    try {
      const res = await fetchMovie(id);
      setMovie(res.movie);
      setMovieState("success");
    } catch (err) {
      setMovieError(extractError(err));
      setMovieState("error");
    }
  }, []);

  const loadSentiment = useCallback(async () => {
    if (!movie) return;
    setSentimentState("loading");
    setSentimentError(null);
    try {
      const res = await fetchSentiment(movie.imdbID);
      setSentiment(res.sentiment);
      setSentimentState("success");
    } catch (err) {
      setSentimentError(extractError(err));
      setSentimentState("error");
    }
  }, [movie]);

  const reset = useCallback(() => {
    setMovie(null);
    setMovieState("idle");
    setMovieError(null);
    setSentiment(null);
    setSentimentState("idle");
    setSentimentError(null);
  }, []);

  return {
    movie,
    movieState,
    movieError,
    sentiment,
    sentimentState,
    sentimentError,
    searchMovie,
    loadSentiment,
    reset,
  };
}
