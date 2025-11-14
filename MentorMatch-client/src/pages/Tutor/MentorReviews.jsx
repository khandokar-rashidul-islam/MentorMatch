import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp } from "lucide-react";
import {
  useCreateMentorReviewMutation,
  useGetMentorReviewsQuery,
  useToggleMentorHelpfulMutation,
} from "../../redux/features/learner/learner.api";
import { toast, Toaster } from "../../hooks/use-toast";

const MentorReviews = ({ mentorId,userId, userRole }) => {
  const { data, isLoading } = useGetMentorReviewsQuery(mentorId);
  const [createReview, { isLoading: submitting }] =
    useCreateMentorReviewMutation();
  const [toggleHelpful] = useToggleMentorHelpfulMutation();

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-24 text-gray-500">
        Loading reviews...
      </div>
    );
  }

  const {
    reviews = [],
    averageRating = 0,
    totalReviews = 0,
    ratingBreakdown = {},
  } = data?.data || {};

  const handleSubmitReview = async () => {
    console.log("Submitting review");
    if (userRole !== "learner") {
      toast({
        title: "Error",
        description: "Only learners can submit reviews",
        variant: "destructive",
      });
      return;
    }

    if (userId === mentorId) {
      toast({
        title: "Error",
        description: "You cannot review your own gig",
        variant: "destructive",
      });
      return;
    }

    if (!newComment || newRating < 1 || newRating > 5) {
      toast({
        title: "Error",
        description: "Please enter valid rating and comment",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview({
        mentorId,
        rating: newRating,
        comment: newComment,
      }).unwrap();
      toast({
        title: "Success",
        description: "Review submitted successfully!",
      });
      setNewComment("");
      setNewRating(5);
    } catch (err) {
      toast({
        title: "Error",
        description: err.data?.message || err.message,
        variant: "destructive",
      });
    }
  };

  const handleHelpful = async (reviewId) => {
    if (userId === mentorId) {
      toast({
        title: "Error",
        description: "You cannot mark helpful on reviews for your own gig",
        variant: "destructive",
      });
      return;
    }
    try {
      await toggleHelpful({ reviewId }).unwrap();
    } catch (err) {
      toast({
        title: "Error",
        description: err.data?.message || err.message,
        variant: "destructive",
      });
    }
  };

  console.log("ReviewSection Props:", {
    mentorId,
    userId,
    userRole,
  });
  console.log("Reviews Data:", data);
  return (
    <Card>
      <Toaster />
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Student Reviews</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-warning text-yellow-500 " />
              <span className="font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating breakdown */}
        <div className="mb-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-8 ">{star}</span>
                <Star className="h-4 w-4 fill-warning text-yellow-500 " />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{ width: `${ratingBreakdown[star] || 0}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12">
                  {ratingBreakdown[star] || 0}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit review */}
        {userRole === "learner" && userId !== mentorId && (
          <div className="border p-4 rounded-lg space-y-2">
            <h4 className="font-semibold">Submit Your Review</h4>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer ${
                    i <= newRating
                      ? "fill-warning text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setNewRating(i)}
                />
              ))}
            </div>
            <textarea
              className="w-full border rounded p-2 text-sm"
              placeholder="Write your review..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleSubmitReview} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        )}

        {/* Individual reviews */}
        <div className="space-y-6 mt-10">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b border-border pb-6 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      alt={review.reviewerId?.learnerProfile?.profileImage}
                      src={review.reviewerId?.learnerProfile?.profileImage}
                      className="w-12 h-12  rounded-full object-cover border-2 border-primary/20"
                    />
                    <h4 className="font-semibold">
                      {review.reviewerId?.learnerProfile?.name || "Anonymous"}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {review.reviewerId?.learnerProfile?.topics?.[0] ||
                        "General"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-warning text-yellow-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-3 leading-relaxed">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-auto p-0 cursor-pointer ${review.helpfulBy.includes(userId)&&"text-primary"}`}
                  onClick={() => handleHelpful(review._id)}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful || 0})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorReviews;
