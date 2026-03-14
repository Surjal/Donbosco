import { SkeletonGrid } from "@/components/ui/SkeletonCards";

export default function LoadingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-14">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
      </div>
      <SkeletonGrid count={6} />
    </div>
  );
}
