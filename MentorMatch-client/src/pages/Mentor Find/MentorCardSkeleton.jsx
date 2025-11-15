import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MentorCardSkeleton = () => {
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 p-0">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left: Avatar + Info */}
          <div className="flex items-start gap-4 flex-1">
            <Skeleton className="h-20 w-20 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-36" /> {/* Name */}
              <Skeleton className="h-4 w-24" /> {/* Profession */}
              {/* Rating + location */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-16" /> {/* Rating */}
                <Skeleton className="h-4 w-24" /> {/* Location */}
              </div>
              <Skeleton className="h-12 w-1/2 mt-2" /> {/* Bio */}
            </div>
          </div>

          {/* Right: Stats + badges + buttons */}
          <div className="lg:w-80 flex flex-col gap-4 mt-4 lg:mt-0">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            {/* Response + experience */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Expertise badges */}
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <Skeleton className="h-10 flex-1 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCardSkeleton;
