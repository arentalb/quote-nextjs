import { Skeleton } from "@/components/ui/skeleton";

export default function CategorySkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-full w-[80px]  rounded-xl" />
    </div>
  );
}
