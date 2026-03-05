import { AlertTriangle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
    message: string;
    onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-destructive/25 bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <Alert variant="destructive" className="max-w-md text-left">
                <AlertDescription>{message}</AlertDescription>
            </Alert>
            {onRetry && (
                <Button variant="outline" size="sm" onClick={onRetry}>
                    <RefreshCw className="h-3.5 w-3.5" /> Try Again
                </Button>
            )}
        </div>
    );
}