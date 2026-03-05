'use client'

import Image from 'next/image'
import { Sparkles, Star, Award, Globe, DollarSign, Calendar, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import type { Movie, FetchState } from '@/types'

interface Props {
    movie: Movie
    sentimentState: FetchState
    onAISummary: () => void
}

function ratingToPercent(r: string) { return Math.min(100, (parseFloat(r) || 0) * 10) }
function ratingColor(r: string) {
    const n = parseFloat(r) || 0
    return n >= 7.5 ? 'bg-emerald-500' : n >= 5.5 ? 'bg-amber-500' : 'bg-red-500'
}

const AVATAR_COLORS = ['#C9A84C', '#3B82F6', '#E67E22', '#9B59B6', '#10B981', '#EF4444']
const avatarBg = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]

function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string }) {
    if (!value || value === 'N/A') return null
    return (
        <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                {icon}{label}
            </span>
            <span className="text-sm text-foreground">{value}</span>
        </div>
    )
}

export default function MovieCard({ movie, sentimentState, onAISummary }: Props) {
    const genres = movie.Genre?.split(',').map((g: string) => g.trim()).filter(Boolean) ?? []
    const cast = movie.Actors?.split(',').map((a: string) => a.trim()).filter(Boolean) ?? []
    const pct = ratingToPercent(movie.imdbRating)
    const barColor = ratingColor(movie.imdbRating)
    const isLoading = sentimentState === 'loading'

    return (
        <div className="space-y-4 animate-fade-up">

            {/* ── Main card ─────────────────────────────────────────────────────── */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-6 flex-wrap">

                        {/* Poster */}
                        <div className="shrink-0">
                            <div className="relative w-44 rounded-xl overflow-hidden border border-border shadow-2xl">
                                {movie.Poster && movie.Poster !== 'N/A' ? (
                                    <Image
                                        src={movie.Poster}
                                        alt={`${movie.Title} poster`}
                                        width={176} height={260}
                                        className="w-full h-auto block"
                                        priority
                                    />
                                ) : (
                                    <div className="w-44 h-64 bg-muted flex items-center justify-center text-4xl opacity-20">🎬</div>
                                )}
                                {/* IMDb badge */}
                                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-background/85 backdrop-blur border border-border px-2 py-1">
                                    <Star className="h-2.5 w-2.5 fill-[var(--gold)] text-[var(--gold)]" />
                                    <span className="text-[11px] font-bold" style={{ color: parseFloat(movie.imdbRating) >= 7 ? 'var(--ok)' : 'var(--warn)' }}>
                                        {movie.imdbRating}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-4">
                            <div>
                                <h1 className="font-display text-3xl font-semibold leading-tight text-foreground mb-1">
                                    {movie.Title}
                                </h1>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                    {[movie.Year, movie.Runtime, movie.Rated].filter(v => v && v !== 'N/A').join('  ·  ')}
                                </p>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2">
                                {genres.map((g: string) => (
                                    <Badge key={g} variant="default">
                                        {g}
                                    </Badge>
                                ))}
                            </div>

                            {/* IMDb rating bar */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>IMDb Rating</span>
                                    <span className="font-semibold" style={{ color: parseFloat(movie.imdbRating) >= 7 ? 'var(--ok)' : 'var(--warn)' }}>
                                        {movie.imdbRating !== 'N/A' ? `${movie.imdbRating} / 10` : 'Unrated'}
                                    </span>
                                </div>
                                <Progress value={pct} className="h-1.5 bg-secondary" />
                                {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                                    <p className="text-[10px] text-muted-foreground/50">{movie.imdbVotes} votes</p>
                                )}
                            </div>

                            {/* Meta grid */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <MetaRow icon={<span className="text-[9px]">🎬</span>} label="Director" value={movie.Director} />
                                <MetaRow icon={<Globe className="h-2.5 w-2.5" />} label="Language" value={movie.Language} />
                                <MetaRow icon={<Globe className="h-2.5 w-2.5" />} label="Country" value={movie.Country} />
                                <MetaRow icon={<Calendar className="h-2.5 w-2.5" />} label="Released" value={movie.Released} />
                                <MetaRow icon={<Clock className="h-2.5 w-2.5" />} label="Runtime" value={movie.Runtime} />
                                <MetaRow icon={<DollarSign className="h-2.5 w-2.5" />} label="Box Office" value={movie.BoxOffice} />
                            </div>

                            {/* Awards */}
                            {movie.Awards && movie.Awards !== 'N/A' && (
                                <div className="flex items-start gap-2.5 rounded-lg bg-[var(--gold-dim)] border border-gold/20 px-3 py-2.5">
                                    <Award className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[var(--gold)]" />
                                    <p className="text-xs leading-relaxed text-[var(--gold)]">{movie.Awards}</p>
                                </div>
                            )}

                            {/* ── AI SUMMARY BUTTON ── */}
                            <Button onClick={onAISummary} disabled={isLoading} size="default">
                                {isLoading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Generating AI Summary…
                                    </>
                                ) : (
                                    <><Sparkles className="h-4 w-4" /> Get AI Summary</>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ── All Ratings ────────────────────────────────────────────────────── */}
            {movie.Ratings?.length > 0 && (
                <Card className="animate-fade-up [animation-delay:60ms]">
                    <CardContent className="p-5">
                        <p className="mb-3 text-[10px] uppercase tracking-widest text-muted-foreground">All Ratings</p>
                        <div className="flex flex-wrap gap-3">
                            {movie.Ratings.map((r: { Source: string; Value: string }) => (
                                <div key={r.Source} className="rounded-lg bg-secondary border border-border px-3 py-2 text-center min-w-[90px]">
                                    <p className="text-[10px] text-muted-foreground mb-0.5 truncate">
                                        {r.Source.replace('Internet Movie Database', 'IMDb').replace('Rotten Tomatoes', 'RT')}
                                    </p>
                                    <p className="text-sm font-semibold text-[var(--gold)]">{r.Value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* ── Plot ───────────────────────────────────────────────────────────── */}
            {movie.Plot && movie.Plot !== 'N/A' && (
                <Card className="animate-fade-up [animation-delay:100ms]">
                    <CardHeader className="pb-3">
                        <h2 className="font-display text-lg text-[var(--gold)]">Plot</h2>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-sm leading-relaxed text-muted-foreground">{movie.Plot}</p>
                    </CardContent>
                </Card>
            )}

            {/* ── Cast ───────────────────────────────────────────────────────────── */}
            {cast.length > 0 && (
                <Card className="animate-fade-up [animation-delay:140ms]">
                    <CardHeader className="pb-3">
                        <h2 className="font-display text-lg text-[var(--gold)] flex items-center gap-2">
                            <Users className="h-4 w-4" /> Cast
                        </h2>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2.5">
                            {cast.map((actor: string) => {
                                const initials = actor.split(' ').slice(0, 2).map(n => n[0]).join('')
                                return (
                                    <div key={actor} className="flex items-center gap-2.5 rounded-xl bg-secondary border border-border px-3 py-2">
                                        <div
                                            className="h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-background"
                                            style={{ background: avatarBg(actor) }}
                                        >
                                            {initials}
                                        </div>
                                        <span className="text-sm text-foreground">{actor}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}