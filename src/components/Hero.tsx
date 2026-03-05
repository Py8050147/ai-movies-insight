import { Film, Sparkles, Star } from 'lucide-react'

export default function Hero() {
    return (
        <div className="mx-auto max-w-xl text-center py-14 space-y-6">
            <div className="flex justify-center gap-4">
                {[Film, Sparkles, Star].map((Icon, i) => (
                    <div key={i}
                        className="h-12 w-12 rounded-2xl bg-card border border-border flex items-center justify-center"
                        style={{ opacity: 1 - i * 0.2, transform: `translateY(${i * 5}px)` }}>
                        <Icon className="h-5 w-5" style={{ color: 'var(--gold)' }} />
                    </div>
                ))}
            </div>

            <h1 className="font-display font-light leading-tight" style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)' }}>
                Discover any film with<br />
                <span className="gold-text font-semibold">AI-powered insight</span>
            </h1>

            <p className="text-muted-foreground leading-relaxed">
                Enter an IMDb ID to get instant movie details, cast info, ratings, and
                an optional AI-generated editorial summary — 100 to 1000 words.
            </p>
        </div>
    )
}