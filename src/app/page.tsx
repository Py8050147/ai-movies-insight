'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchBar from '@/components/SearchBar'
import MovieCard from '@/components/MovieCard'
import SentimentCard from '@/components/SentimentCard'
import ErrorMessage from '@/components/ErrorMessage'
import { MovieSkeleton, SentimentSkeleton } from '@/components/Skeleton'
import { useMovie } from '@/hooks/useMovies'

export default function HomePage() {
  const {
    movie, movieState, movieError,
    sentiment, sentimentState, sentimentError,
    searchMovie, loadSentiment, reset,
  } = useMovie()

  const idle = movieState === 'idle'
  const loading = movieState === 'loading'
  const success = movieState === 'success'
  const error = movieState === 'error'

  return (
    <div className="min-h-screen bg-background">
      <Header onReset={reset} hasMovie={success} />

      <main className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">

        {/* Landing hero */}
        {idle && <Hero />}

        {/* Search bar — always visible */}
        <div className={idle ? 'pb-10' : 'py-8'}>
          <SearchBar onSearch={searchMovie} loading={loading} />
        </div>

        {/* ── Step 1: Movie result ──────────────────────────────────────────── */}
        {loading && <MovieSkeleton />}
        {error && <ErrorMessage message={movieError ?? 'Could not fetch movie. Check the IMDb ID.'} />}

        {success && movie && (
          <>
            <MovieCard
              movie={movie}
              sentimentState={sentimentState}
              onAISummary={loadSentiment}
            />

            {/* ── Step 2: AI Sentiment (on button click) ─────────────────── */}
            {sentimentState === 'loading' && <SentimentSkeleton />}

            {sentimentState === 'error' && (
              <div className="mt-6">
                <ErrorMessage
                  message={sentimentError ?? 'AI summary failed. Please try again.'}
                  onRetry={loadSentiment}
                />
              </div>
            )}

            {sentimentState === 'success' && sentiment && (
              <SentimentCard sentiment={sentiment} />
            )}
          </>
        )}
      </main>
    </div>
  )
}