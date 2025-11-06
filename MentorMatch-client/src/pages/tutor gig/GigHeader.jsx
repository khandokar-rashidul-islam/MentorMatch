import React from 'react'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Flag, Star, Users, Clock, Award } from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router';
import Intro from './Intro';


const GigHeader = ({ gig }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
   
  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };
  //header data
  const data = gig.data;
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        {/* Main Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="bg-gradient-primary text-primary"
              >
                Top Rated
              </Badge>
              <Badge variant="outline">Mathematics Expert</Badge>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold mb-3">
              {data.gigTitle}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium text-foreground">4.9</span>
                <span>(1,247 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>2,341 students taught</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Usually responds within 2 hours</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {
                data.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))
              }
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                isLiked ? "text-red-500 border-red-200" : ""
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{likeCount}</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Report</span>
            </Button>
          </div>
        </div>

        {/* Achievement Bar */}
        <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-medium">Top Tutor</span>
              <span className="text-sm text-muted-foreground">• Level 2 </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Member since 2019 • Last online 2 hours ago
            </div>
          </div>
        </div>

        <Intro />
      </CardContent>
    </Card>
  );
};

export default GigHeader