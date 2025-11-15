import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";

const TutorDetailsSkeleton = () => {
  const skills = new Array(5).fill("");
  const certifications = new Array(3).fill("");
  const availability = [
    { day: "Mon" },
    { day: "Tue" },
    { day: "Wed" },
    { day: "Thu" },
    { day: "Fri" },
  ];
  const badges = new Array(4).fill("");
  const buttons = new Array(4).fill("");
  return (
    <div className="min-h-screen mt-20">
      <main className="w-11/12 mx-auto py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tutor Profile */}
            <Card className="overflow-hidden animate-pulse">
              <CardContent className="p-4 sm:p-6">
                {/* Header with avatar and basic info */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="mx-auto sm:mx-0 relative">
                    <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
                    <Skeleton className="absolute -bottom-1 -right-1 sm:top-24 sm:right-2 w-6 h-6 rounded-full" />
                  </div>

                  {/* Profile info */}
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-48 rounded mx-auto sm:mx-0" />{" "}
                    {/* Name */}
                    <Skeleton className="h-4 w-32 rounded mx-auto sm:mx-0" />{" "}
                    {/* Expertise */}
                    {/* Rating / Location / Response time */}
                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-2 mt-2">
                      <Skeleton className="h-4 w-16 rounded" />
                      <Skeleton className="h-4 w-20 rounded" />
                      <Skeleton className="h-4 w-32 rounded" />
                    </div>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {badges.map((_, idx) => (
                        <Skeleton key={idx} className="h-6 w-24 rounded" />
                      ))}
                    </div>
                    {/* Like/Share Buttons */}
                    <div className="flex gap-2 mt-4">
                      {buttons.map((_, idx) => (
                        <Skeleton
                          key={idx}
                          className="h-10 w-10 rounded-full"
                        />
                      ))}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {buttons.map((_, idx) => (
                        <Skeleton key={idx} className="h-10 w-32 rounded-md" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Skeleton */}
            <Card className='p-1'>
              <div className="flex gap-2 items-center justify-between flex-wrap w-full ">
                <Skeleton className="h-6 w-1/4 rounded" />
                <Skeleton className="h-6 w-1/4 rounded" />
                <Skeleton className="h-6 w-1/4 rounded" />
              </div>
            </Card>


            {/* About Section Skeleton */}
            <Card className="p-4 space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </Card>

            {/* Certifications Skeleton */}
            <Card className="p-4 space-y-3">
              {certifications.map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded" />
              ))}
            </Card>

            {/* Weekly Availability */}
            <Card className="xl:hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Weekly Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {availability.map((_, idx) => (
                  <div key={idx} className="flex justify-between">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Skeleton */}
            <Card className="p-4 space-y-2">
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-full rounded" />
            </Card>

            {/* FAQ Skeleton */}
            <Card className="p-4 space-y-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-full rounded" />
            </Card>
          </div>

          {/* Sidebar Skeleton */}
          <div className="hidden xl:block space-y-6">
            <Card className="p-4">
              <Skeleton className="h-60 w-full rounded" />
            </Card>
            <Card className="p-4">
              <Skeleton className="h-60 w-full rounded" />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDetailsSkeleton;
