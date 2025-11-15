import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const GigCardSkeleton = () => {
  return (
    <Card className="flex flex-col justify-between h-full rounded-xl border shadow-sm">
      <CardHeader className="pb-0">
        {/* Top Row */}
        <div className="flex items-start justify-between relative">
          
          {/* Avatar + Name */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          {/* Pro Badge */}
          <Skeleton className="h-5 w-10 rounded-full absolute right-0" />
        </div>

        {/* Title */}
        <CardTitle className="mt-2">
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-4/5" />
        </CardTitle>

        {/* Description */}
        <CardDescription className="mt-2">
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-3/4" />
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow space-y-4">
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

      </CardContent>
    </Card>
  );
};

export default GigCardSkeleton;
