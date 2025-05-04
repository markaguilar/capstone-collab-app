import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => {
  return (
    <div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonLoading;
