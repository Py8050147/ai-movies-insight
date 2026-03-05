export interface OmdbRating {
  Source: string;
  Value: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdbRating[];
  imdbRating: string;
  imdbVotes: string;
  BoxOffice: string;
  Type: string;
}

export type SentimentLabel = "positive" | "mixed" | "negative";

export interface Sentiment {
  summary: string;
  wordCount: number;
  sentiment: SentimentLabel;
  score: number;
  highlights: [string, string, string];
  themes: [string, string, string];
  recommended: boolean;
  isFallback: boolean;
}

export interface MovieApiResponse {
  movie: Movie;
}
export interface SentimentApiResponse {
  sentiment: Sentiment;
}
export type FetchState = "idle" | "loading" | "success" | "error";
