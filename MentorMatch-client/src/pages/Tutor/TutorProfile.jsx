import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  MoreHorizontal,
  Link,
} from "lucide-react";
import { NavLink } from "react-router";
import { useGetActiveProfileQuery } from "../../redux/features/user/userApi";

const TutorProfile = () => {
  const { data,isLoading, isError } = useGetActiveProfileQuery(
    null,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(247);

  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const user = data?.data?.user;
  const profile = user?.profile;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading profile</div>;
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* Header with avatar and basic info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="relative mx-auto sm:mx-0">
            <img
              src={profile?.profileImage}
              alt={profile?.name}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 sm:top-24 sm:right-2 bg-success rounded-full p-0.5 sm:p-1">
              <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex relative flex-col sm:flex-row sm:flex-wrap items-center sm:items-start sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {profile?.name}
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-2">
                  {profile?.expertiseAreas?.join(" & ")}
                </p>

                <div className="flex flex-col flex-wrap sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-warning text-warning" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-muted-foreground text-sm sm:text-base">
                      (234 reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">New York, NY</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">
                      Usually responds in 2 hours
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{profile?.education}</Badge>
                  <Badge variant="secondary">
                    {profile?.experienceYears}+ Years Experience
                  </Badge>
                  <Badge variant="secondary">500+ Students</Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>

              <div className="sm:absolute -top-10 right-0.5 flex items-center justify-center sm:justify-end gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  className={`${isLiked ? "text-red-500" : ""} `}
                >
                  <Heart
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      isLiked ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {likeCount}
                </span>

                <Button variant="ghost" size="icon" className="">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="">
                  <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 mt-4">
              <Button
                variant="default"
                size="sm"
                className="sm:size-lg  sm:flex-none"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Tutor
              </Button>
              <Button variant="outline" size="sm" className="sm:size-lg">
                View Schedule
              </Button>
              <Button variant="default" size="sm" className="sm:size-lg">
                Book Trial Lesson
              </Button>
              <NavLink to="/dashboard/mentor/mentor-profile/edit">
                <Button variant="outline" size="sm" className="sm:size-lg">
                  Edit Profile
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorProfile;
