import { Loading } from "@/components/ui/Loading";

export default function LoadingPage() {
  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center py-20">
      <Loading size="lg" variant="spinner" />
      <p className="mt-6 text-lg font-medium text-muted-foreground animate-pulse">
        Loading Media...
      </p>
    </div>
  );
}
