import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Clock,
  DollarSign,
  FileText,
  Star,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetGigsByUserIdQuery } from "../../redux/features/learner/learner.api";
import { Skeleton } from "../../components/ui/skeleton";

const Gigs = ({ mentorId }) => {
  console.log(mentorId);
  const { data, isLoading } = useGetGigsByUserIdQuery(mentorId);
  const gigs = data?.data || [];
  console.log(gigs);
  // State to control visible gigs
  const [visibleCount, setVisibleCount] = useState(5);

  // Function to show more gigs (3 per click)
  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Collapse back to 5 gigs
  const handleSeeLess = () => {
    setVisibleCount(5);
  };

  const visibleGigs = gigs.slice(0, visibleCount);
  return (
    <Card>
      <CardContent>
        <div className="space-y-4 ">
            {/* loading  */}
            {isLoading &&
            [...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                    
                  <Skeleton className="h-5 w-1/3" /> {/* title */}
                  <Skeleton className="h-4 w-full" /> {/* line */}
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </CardContent>
              </Card>
            ))}
          {visibleGigs.map((gig) => (
            <Card>
              <CardContent className="">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{gig.gigTitle}</h4>
                      <Badge variant="secondary">Best Seller</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm">
                      {gig.aboutGig}
                    </p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.9</span>
                        <span className="text-sm text-muted-foreground">
                          (127)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>1 hour sessions</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-semibold">
                          {gig.plans.instant.price}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {gig.status}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center items-center">
            {visibleCount < gigs.length ? (
              <Button onClick={handleSeeMore}>See More</Button>
            ) : gigs.length > 5 ? (
              <Button variant="outline" onClick={handleSeeLess}>
                See Less
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Gigs;
