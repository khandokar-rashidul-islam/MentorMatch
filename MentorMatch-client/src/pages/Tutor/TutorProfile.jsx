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




const TutorProfile = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(247);

  const handleLike = () => {
    setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const subjects = [
    "Algebra",
    "Calculus",
    "Geometry",
    "Statistics",
    "Physics",
    "Trigonometry",
    "Linear Algebra",
    "Differential Equations",
  ];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* Header with avatar and basic info */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          
            <div className="relative mx-auto sm:mx-0">
              <img
                alt="Dr. Sarah Johnson"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-primary/20"
              />
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-success rounded-full p-0.5 sm:p-1">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dr. Sarah Johnson</h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-2">Mathematics & Physics Expert</p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-warning text-warning" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-muted-foreground text-sm sm:text-base">(234 reviews)</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">New York, NY</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-sm sm:text-base">Usually responds in 2 hours</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">PhD Mathematics</Badge>
                  <Badge variant="secondary">10+ Years Experience</Badge>
                  <Badge variant="secondary">500+ Students</Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>

              <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLike}
                  className={`${isLiked ? "text-red-500" : ""} h-8 w-8 sm:h-10 sm:w-10`}
                >
                  <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? "fill-current" : ""}`} />
                </Button>
                <span className="text-xs sm:text-sm text-muted-foreground">{likeCount}</span>

                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                  <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <Button variant="default" size="sm" className="sm:size-lg flex-1 sm:flex-none">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Tutor
              </Button>
              <Button variant="outline" size="sm" className="sm:size-lg">
                View Schedule
              </Button>
              <Button variant="default" size="sm" className="sm:size-lg">
                Book Trial Lesson
              </Button>
            </div>
          </div>
        </div>

        {/* About section */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About</h3>
          <p className="text-muted-foreground leading-relaxed">
            With over 10 years of experience in education, I specialize in making complex mathematical
            and physics concepts accessible and engaging. I hold a PhD in Applied Mathematics from MIT
            and have helped over 500 students achieve their academic goals. My teaching approach focuses
            on building strong foundations and developing problem-solving skills that last a lifetime.
          </p>
        </div>

        {/* Subjects taught */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Subjects I Teach</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {subjects.map((subject) => (
              <Badge key={subject} variant="outline" className="justify-center py-1.5 sm:py-2 text-xs sm:text-sm">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Hourly Rates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">$45</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Group Sessions</div>
            </div>
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">$80</div>
              <div className="text-xs sm:text-sm text-muted-foreground">1-on-1 Sessions</div>
            </div>
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg bg-gradient-subtle">
              <div className="text-xl sm:text-2xl font-bold text-primary">$120</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Premium Package</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorProfile;
