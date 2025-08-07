import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Reply, Flag, Star } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator"


const CommentSection = () => {
  const [newComment, setNewComment] = useState("");

  const comments = [
    {
      id: 1,
      user: {
        name: "Michael Chen",
        avatar: "/api/placeholder/40/40",
        initial: "MC",
        verified: true
      },
      rating: 5,
      comment: "Dr. Sarah is absolutely amazing! She helped me understand calculus concepts that I'd been struggling with for months. Her teaching method is clear and patient.",
      date: "2 days ago",
      likes: 12,
      replies: 2,
      helpful: true
    },
    {
      id: 2,
      user: {
        name: "Emma Rodriguez",
        avatar: "/api/placeholder/40/40",
        initial: "ER",
        verified: false
      },
      rating: 5,
      comment: "Excellent tutor! Very professional and knowledgeable. She provided customized study materials and was always available for questions.",
      date: "1 week ago",
      likes: 8,
      replies: 1,
      helpful: true
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "/api/placeholder/40/40",
        initial: "DK",
        verified: true
      },
      rating: 4,
      comment: "Great experience overall. Sarah helped me prepare for my SAT math section. My score improved significantly!",
      date: "2 weeks ago",
      likes: 15,
      replies: 0,
      helpful: true
    }
  ];
  return (
    <div> <Card>
      <CardHeader>
        <CardTitle className="flex items-center flex-wrap gap-3 justify-between">
          <span>Learner Comments & Reviews</span>
          <Badge variant="secondary">{comments.length} reviews</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment */}
        <div className="space-y-4">
          <Textarea
            placeholder="Share your experience with this tutor..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rate your experience:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-muted-foreground hover:text-yellow-500 cursor-pointer" />
                ))}
              </div>
            </div>
            <Button size="sm">Post Comment</Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className=" flex flex-col gap-3">
                <div className="flex items-center justify-between flex-wrap  gap-2">
                  {/* user details */}
                  <div className='flex items-center gap-4'>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.initial}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{comment.user.name}</span>
                    {comment.user.verified && (
                      <Badge variant="outline" className="text-xs h-5">Verified</Badge>
                    )}
                  </div>
                  {/* stars and dates */}
                  <div className="w-full sm:w-1/2 flex items-center justify-end gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < comment.rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground">• {comment.date}</span>
                  </div>
                  
                </div>
                <Separator />


                <div className="space-y-2">

                  <p className="text-sm px-2">{comment.comment}</p>

                  <div className="flex items-center flex-wrap gap-4">
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <Heart className="h-3 w-3 mr-1" />
                      Helpful ({comment.likes})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      <Flag className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>

                  {comment.replies > 0 && (
                    <Button variant="ghost" size="sm" className="text-xs text-primary">
                      View {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Comments</Button>
        </div>
      </CardContent>
    </Card></div>
  )
}

export default CommentSection