import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import MentorCard from "./MentorCard";
import { useGetAllMentorsQuery } from "../../redux/features/learner/learner.api";
import MentorCardSkeleton from "./MentorCardSkeleton";

const SearchMentor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allMentors, setAllMentors] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Call API dynamically
  const { data, isLoading, isFetching } = useGetAllMentorsQuery({
    searchTerm: searchQuery,
    limit:6,
    page,
    sort: "-experience",
  });

  console.log("Mentors Data:", data?.data);
  const mentors = data?.data || [];
  const total = data?.meta?.total || 0;

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const shouldShowMentorList = searchQuery.trim().length > 0;


useEffect(() => {
  if (data?.data) {
    const newMentors = data.data;

    if (page === 1) {
      // fresh load
      setAllMentors(newMentors);
    } else {
      // append next mentors
      setAllMentors((prev) => [...prev, ...newMentors]);
    }

    // Check if more pages exist
    setHasMore(data.meta.page < data.meta.totalPage);
  }
}, [data , page]);



  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-4">
            Find Your Perfect Mentor
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Search for Mentors by subject, topic, or mentor name to discover
            expert instructors who match your learning needs.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            <Badge variant="outline">Mathematics</Badge>
            <Badge variant="outline">Programming</Badge>
            <Badge variant="outline">Languages</Badge>
            <Badge variant="outline">Science</Badge>
            <Badge variant="outline">Arts</Badge>
          </div>
        </div>

        {/* Search Input */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-elegant">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              placeholder="Search mentors by name or subject..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        {shouldShowMentorList ? (
          <>
            {/* Loading */}
            {isLoading || isFetching ? (
              <div className="space-y-6">
                <MentorCardSkeleton />
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-muted-foreground">{total} Mentors found</p>
                </div>

                {/* Mentors List */}
                {mentors.length > 0 ? (
                  <div className="space-y-6">
                    {mentors.map((mentor) => (
                      <MentorCard key={mentor._id} tutor={mentor} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No Mentors found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                )}

                {/* Load More */}
                {hasMore && (
                  <div className="text-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      disabled={isFetching}
                      onClick={handleLoadMore}
                    >
                      {isFetching ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Featured Mentors Before Searching */
          <div className="mt-12">
            <h3 className="text-xl  mb-6 ">Featured Mentors</h3>

            {isLoading || isFetching ? (
              <div className="space-y-6">
                <MentorCardSkeleton />
                <MentorCardSkeleton />
              </div>
            ) : (
              <>
                {mentors.length > 0 ? (
                  <div className="flex flex-col  gap-6">
                    {allMentors.map((mentor) => (
                      <MentorCard key={mentor._id} tutor={mentor} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10">
                    No mentors available yet.
                  </p>
                )}

                {hasMore && (
                  <div className="text-center mt-10">
                    <Button
                      variant="outline"
                      size="lg"
                      disabled={isFetching}
                      onClick={handleLoadMore}
                    >
                      {isFetching ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchMentor;
