import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function MovieSkeleton() {
    return (
        <div className="space-y-4 animate-[fade-up_0.3s_ease_both]">
            <Card>
                <CardContent className="p-6">
                    <div className="flex gap-6">
                        <Skeleton className="h-64 w-44 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-9 w-3/5" />
                            <Skeleton className="h-3 w-2/5" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                            <div className="grid grid-cols-2 gap-3">
                                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
                            </div>
                            <Skeleton className="h-10 w-40 rounded-lg" />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card><CardContent className="p-5">
                <Skeleton className="h-3 w-1/2 mb-3" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-4/5" />
            </CardContent></Card>
        </div>
    )
}

export function SentimentSkeleton() {
    return (
        <div className="mt-8 space-y-4 animate-[fade-up_0.3s_ease_both]">
            <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-48" />
                </div>
            </div>
            <Card><CardContent className="p-5"><Skeleton className="h-2 w-full rounded-full" /></CardContent></Card>
            <Card>
                <CardHeader className="pb-3"><Skeleton className="h-4 w-36" /></CardHeader>
                <CardContent className="pt-0 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-3" style={{ width: `${85 + Math.random() * 15}%` }} />
                    ))}
                </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
                {[0, 1].map(col => (
                    <Card key={col}>
                        <CardHeader className="pb-3"><Skeleton className="h-4 w-24" /></CardHeader>
                        <CardContent className="pt-0 space-y-3">
                            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}