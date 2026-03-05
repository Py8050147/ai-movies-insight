import { Clapperboard } from 'lucide-react'

interface Props { onReset: () => void; hasMovie: boolean }

export default function Header({ onReset, hasMovie }: Props) {
    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
                <button
                    onClick={hasMovie ? onReset : undefined}
                    className="flex items-center gap-2.5 cursor-pointer"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: hasMovie ? 'pointer' : 'default' }}
                >
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))' }}>
                        <Clapperboard className="h-4 w-4" style={{ color: '#07070E' }} />
                    </div>
                    <span className="font-display text-xl font-semibold tracking-wide">
                        <span className="gold-text">Cine</span>
                        <span className="text-foreground">Insight</span>
                    </span>
                </button>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden sm:block">
                    AI Movie Intelligence
                </p>
            </div>
        </header>
    )
}