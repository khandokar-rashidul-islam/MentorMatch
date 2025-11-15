import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import MentorCard from "./MentorCard";
import { useGetAllMentorsQuery } from "../../redux/features/learner/learner.api";
import MentorCardSkeleton from "./MentorCardSkeleton";

const SearchMentor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(5);

  // Call API dynamically
  const { data, isLoading, isFetching } = useGetAllMentorsQuery({
    searchTerm: searchQuery,
    limit,
    page: 1,
    sort: "-experience",
  });

  console.log("Mentors Data:", data?.data);
  const mentors = data?.data || [];
  const total = data?.meta?.total || 0;

  const loadMore = () => {
    setLimit((prev) => prev + 5);
  };

  const shouldShowMentorList = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Find Your Perfect Mentor
          </h1>
          <p className="text-muted-foreground text-center">
            Connect with expert Mentors across various subjects and skill levels
          </p>
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
                {mentors.length < total && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg" onClick={loadMore}>
                      Load More Mentors
                    </Button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Empty State Before Search */
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-primary mx-auto mb-6" />
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
        )}
      </main>
    </div>
  );
};

export default SearchMentor;
