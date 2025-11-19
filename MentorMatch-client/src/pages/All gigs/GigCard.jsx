import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Users, BookOpen, MessageCircle } from "lucide-react";
import { Link } from "react-router";

const GigCard = ({ gig }) => {
  // console.log(gig)
  return (
    <Card
      key={gig._id}
      className="flex flex-col justify-between h-full rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between relative">
          {/* Tutor Info */}
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={gig.user.mentorProfile.profileImage}
                alt={gig.user.mentorProfile.name}
              />
              <AvatarFallback>
                {gig.user.mentorProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                {/* mentor name */}
                <Link
                  to={`/dashboard/learner/mentor-profile/${gig?.user?._id}`}
                >
                  <h4 className="font-semibold flex-1 hover:text-primary">
                    {gig.user.mentorProfile.name}
                  </h4>
                </Link>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {/* ratings */}
                <span>{"2.3"}</span>
                {/* reviews */}
                <span>({"44"})</span>
              </div>
            </div>
          </div>

          {/* Featured Tag */}
          <div className=" absolute right-0 flex flex-col items-end gap-1">
            <Badge className="bg-green-600 text-white  rounded-full  ">
              Pro
            </Badge>
            {/*{gig.featured && (
              <Badge className="bg-red-500 text-white rounded-fullpx-1 py-0.5 text-[10px] sm:text-[11px]">
                Featured
              </Badge>
            )}*/}
          </div>
        </div>

        {/* Title */}
        <CardTitle className=" font-semibold overflow-hidden line-clamp-2 mt-1 leading-snug">
          {gig.gigTitle}
        </CardTitle>

        {/* Description (truncated) */}
        <CardDescription className="text-sm mt-1 text-gray-600 overflow-hidden line-clamp-2">
          {gig.aboutGig}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow ">
        {/* Skills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {gig.relatedTopics.map((skill) => (
            <Badge
              key={skill}
              variant="outline"
              className="rounded-full px-2 py-1 text-xs"
            >
              {skill}
            </Badge>
          ))}
          {gig.relatedTopics.length > 3 && (
            <Badge variant="outline" className="rounded-full px-3 py-1 text-sm">
              +{gig.relatedTopics.length - 3}
            </Badge>
          )}
        </div>

        {/* Info Row */}
        <div className="flex items-center justify-between text-sm py-2 text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{gig.duration || "30min"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{gig.students || 0}</span>
            </div>
          </div>
          <div className=" flex items-center gap-2 text-right">
            <div className="text-lg font-bold text-primary">
              ${gig.plans.instant.price}
            </div>
            <div className="text-xs text-gray-400">per session</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2">
          <Link to={`/dashboard/inbox`} className="flex-1 ">
            <Button
              variant="outline"
              size="sm"
              className=" w-full flex items-center cursor-pointer justify-center gap-2 py-2  "
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Button>
          </Link>

          <Link
            to={`/dashboard/learner/gig-details/${gig._id}`}
            className="flex-1 "
          >
            <Button
              size="sm"
              className=" w-full flex-1 flex items-center cursor-pointer justify-center gap-2 py-2 bg-primary"
            >
              <BookOpen className="h-4 w-4" />
              Book Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default GigCard;
