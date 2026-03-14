import { Loading } from "@/components/ui/Loading";

export default function GlobalLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <Loading size="lg" variant="spinner" text="Loading..." />
    </div>
  );
}
