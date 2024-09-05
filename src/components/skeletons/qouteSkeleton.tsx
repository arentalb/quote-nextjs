import { Skeleton } from "@/components/ui/skeleton";

export default function QouteSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[150px]  rounded-xl" />
    </div>
  );
}
