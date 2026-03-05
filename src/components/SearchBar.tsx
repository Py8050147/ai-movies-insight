"use client";

import { useState, type FormEvent } from "react";
import { Search, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { isValidImdbId } from "@/lib/api";

interface Props {
    onSearch: (id: string) => void;
    loading: boolean;
}

const QUICK_PICKS = [
    { label: "The Matrix", id: "tt0133093" },
    { label: "Inception", id: "tt1375666" },
    { label: "Parasite", id: "tt6751668" },
    { label: "Dark Knight", id: "tt0468569" },
    { label: "Interstellar", id: "tt0816692" },
    { label: "Oppenheimer", id: "tt15398776" },
];

export default function SearchBar({ onSearch, loading }: Props) {
    const [value, setValue] = useState("");
    const [touched, setTouched] = useState(false);

    const trimmed = value.trim();
    const valid = isValidImdbId(trimmed);
    const showErr = touched && trimmed !== "" && !valid;

    function submit(e: FormEvent) {
        e.preventDefault();
        setTouched(true);
        if (valid) onSearch(trimmed);
    }

    function pick(id: string) {
        setValue(id);
        setTouched(false);
        onSearch(id);
    }

    return (
        <div className="mx-auto w-full max-w-2xl space-y-4">
            <form onSubmit={submit}>
                <div
                    className={cn(
                        "flex items-center gap-2 rounded-xl border bg-card px-4 py-2 transition-all",
                        showErr
                            ? "border-destructive ring-1 ring-destructive/30"
                            : valid && touched
                                ? "ring-1"
                                : "border-border"
                    )}
                    style={
                        valid && touched
                            ? { borderColor: "var(--gold)", boxShadow: "0 0 0 3px var(--gold-dim)" }
                            : {}
                    }
                >
                    <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

                    <Input
                        value={value}
                        onChange={(e) => { setValue(e.target.value); setTouched(false); }}
                        placeholder="Enter IMDb ID — e.g. tt0133093"
                        disabled={loading}
                        autoComplete="off"
                        spellCheck={false}
                        aria-label="IMDb ID"
                        className="h-auto border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                    />

                    <Button type="submit" disabled={loading || !trimmed} size="sm" className="shrink-0">
                        {loading ? (
                            <>
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Searching…
                            </>
                        ) : (
                            <>
                                <Film className="h-3.5 w-3.5" />
                                Search
                            </>
                        )}
                    </Button>
                </div>
            </form>

            {showErr && (
                <p className="pl-1 text-xs text-destructive">
                    Enter a valid IMDb ID — &quot;tt&quot; followed by 7–8 digits (e.g. tt0133093)
                </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Try:</span>
                {QUICK_PICKS.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => pick(p.id)}
                        disabled={loading}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)] disabled:opacity-40 cursor-pointer bg-transparent"
                    >
                        {p.label}
                    </button>
                ))}
            </div>
        </div>
    );
}