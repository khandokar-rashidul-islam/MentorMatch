import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp } from "lucide-react";

const ReviewSection = () => {
    const reviews = [
    {
      id: 1,
      name: "Emily Chen",
      rating: 5,
      date: "2 weeks ago",
      subject: "Calculus",
      content: "Dr. Johnson is an exceptional tutor! She helped me understand complex calculus concepts that I was struggling with for months. Her teaching method is clear and patient.",
      helpful: 12
    },
    {
      id: 2,
      name: "Marcus Williams",
      rating: 5,
      date: "1 month ago",
      subject: "Physics",
      content: "Amazing experience! The way she explains physics problems makes everything click. I went from failing to getting A's in my physics class.",
      helpful: 8
    },
    {
      id: 3,
      name: "Sophia Martinez",
      rating: 4,
      date: "2 months ago",
      subject: "Algebra",
      content: "Very knowledgeable and helpful. Sometimes the sessions go a bit fast, but overall great experience. Would recommend!",
      helpful: 5
    }
  ];

  const averageRating = 4.9;
  const totalReviews = 234;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Student Reviews</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-warning text-warning" />
              <span className="font-semibold">{averageRating}</span>
              <span className="text-muted-foreground">({totalReviews} reviews)</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Rating breakdown */}
        <div className="mb-6">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm w-8">{stars}</span>
                <Star className="h-4 w-4 fill-warning text-warning" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-warning h-2 rounded-full"
                    style={{ 
                      width: stars === 5 ? '85%' : 
                             stars === 4 ? '12%' : 
                             stars === 3 ? '2%' : 
                             stars === 2 ? '1%' : '0%' 
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12">
                  {stars === 5 ? '85%' : 
                   stars === 4 ? '12%' : 
                   stars === 3 ? '2%' : 
                   stars === 2 ? '1%' : '0%'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{review.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {review.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? 'fill-warning text-warning' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {review.content}
              </p>
              
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">View All Reviews</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReviewSection