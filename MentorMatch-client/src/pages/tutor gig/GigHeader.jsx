import React from 'react'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Flag,
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link } from 'react-router';
import { useAppSelector } from '../../redux/hooks';


const GigHeader = ({ gig }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1247);
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.activeRole;
  console.log(role)
  console.log("gig data from dig header:",gig)
   
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
  const userData= gig.data.user.mentorProfile;
  const mentorId=data.user.id
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
              {data.keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
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
        {/* === user Intro Section === */}
        <Card className="overflow-hidden border-none shadow-none pb-0 ">
          <CardContent>
            {/* Header with avatar and basic info */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="relative mx-auto sm:mx-0">
                <img
                  alt={userData.profileImage}
                  src={userData.profileImage}
                  className="w-24 h-24  rounded-full object-cover border-4 border-primary/20"
                />
                <div className="absolute right-1 bottom-5 bg-success rounded-full ">
                  <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary">
                      <Link to={`/dashboard/${role}/mentor-profile${role ==='learner'?`/${mentorId}`:''}`}>
                        {userData.name}
                      </Link>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-2">
                      {userData.profession}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                      <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-sm sm:text-base">
                          {userData.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GigHeader