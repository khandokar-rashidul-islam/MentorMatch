import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const GigDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20 space-y-8">
        {/* === Header Skeleton === */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>

            {/* Title */}
            <Skeleton className="h-6 w-3/4 rounded-md" />

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Skeleton className="h-4 w-30 rounded-md" />
              <Skeleton className="h-4 w-34 rounded-md" />
              <Skeleton className="h-4 w-38 rounded-md" />
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16 rounded-full" />
              ))}
            </div>


            {/* Achievement Bar */}
            <div className="flex justify-between items-center flex-wrap">
              <Skeleton className="h-4 w-1/3 rounded-lg mt-4" />  
              <Skeleton className="h-4 w-1/3 rounded-lg mt-4" />  
            </div>
            

            {/* Tutor Intro Section */}
            <Card className="overflow-hidden border-none shadow-none">
              <CardContent className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                {/* Avatar */}
                <Skeleton className="w-24 h-24 rounded-full mx-auto sm:mx-0" />
                {/* Info */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-1/2 rounded-md" />
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-24 rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === Main Content Skeleton === */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </CardContent>
            </Card>

            {/* Services Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-48 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-md" />
                ))}
              </CardContent>
            </Card>

            {/* Subjects Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-48 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </CardContent>
            </Card>

            {/* Booking Plans Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-md" />
                ))}
              </CardContent>
            </Card>

            {/* FAQ Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-32 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full rounded-md" />
                ))}
              </CardContent>
            </Card>

            {/* Reviews Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-40 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-md" />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* === Sidebar Skeleton === */}
          <div className="space-y-6">
            {/* Gig Stats Skeleton */}
            <Card className="space-y-3 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-md" />
              ))}
            </Card>

            {/* Related Skills Skeleton */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-5 w-32 rounded-md" />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Services Skeleton */}
        <Card className="mt-8 px-5 py-6 space-y-4">
          <Skeleton className="h-6 w-60 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default GigDetailsSkeleton;
