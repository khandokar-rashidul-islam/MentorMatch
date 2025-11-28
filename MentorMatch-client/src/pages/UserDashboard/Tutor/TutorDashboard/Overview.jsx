import {
  Users,
  Calendar,
  DollarSign,
  Star,
  MessageCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data
const upcomingSessions = [
  {
    id: 1,
    student: "Sarah Johnson",
    subject: "Calculus",
    time: "10:00 AM - 11:00 AM",
    date: "Today",
    type: "Video Call",
    status: "confirmed",
    avatar: "SJ",
  },
  {
    id: 2,
    student: "Mike Chen",
    subject: "Physics",
    time: "2:30 PM - 3:30 PM",
    date: "Today",
    type: "Screen Share",
    status: "confirmed",
    avatar: "MC",
  },
  {
    id: 3,
    student: "Emma Davis",
    subject: "Chemistry",
    time: "9:00 AM - 10:00 AM",
    date: "Tomorrow",
    type: "Video Call",
    status: "pending",
    avatar: "ED",
  },
];

const recentChats = [
  {
    id: 1,
    student: "Alex Thompson",
    message: "Thanks for the calculus help! Could we schedule another session?",
    time: "5 min ago",
    avatar: "AT",
    unread: true,
  },
  {
    id: 2,
    student: "Lisa Wong",
    message: "I have a question about yesterday's physics problem...",
    time: "1 hour ago",
    avatar: "LW",
    unread: true,
  },
  {
    id: 3,
    student: "David Brown",
    message: "The chemistry notes were very helpful, thank you!",
    time: "3 hours ago",
    avatar: "DB",
    unread: false,
  },
];

const recentReviews = [
  {
    id: 1,
    student: "Jennifer Lee",
    rating: 5,
    comment:
      "Excellent teaching style! Very patient and explains concepts clearly.",
    subject: "Mathematics",
    avatar: "JL",
  },
  {
    id: 2,
    student: "Robert Kim",
    rating: 5,
    comment: "Great mentor! Helped me understand complex physics concepts.",
    subject: "Physics",
    avatar: "RK",
  },
];

export default function Overview() {
  return (
    <div className="space-y-6 pt-20 mb-4 w-11/12 mx-auto">
      {/* Welcome Section */}
      <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10 rounded-xl shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h2>
            <p className="text-muted-foreground mb-4">
              Your profile is 85% complete. Complete your profile to attract
              more students.
            </p>
            <Progress value={85} className="w-full mb-3" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline">Edit Profile</Button>
            <Button className="bg-primary text-white">
              Create New Session
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 item gap-6">
        <StatsCard
          title="Total Students"
          value="127"
          change={{ value: "+12%", trend: "up" }}
          icon={Users}
        />
        <StatsCard
          title="Sessions Completed"
          value="348"
          change={{ value: "+8%", trend: "up" }}
          icon={Calendar}
        />
        <StatsCard
          title="Earnings (This Month)"
          value="$2,840"
          change={{ value: "+15%", trend: "up" }}
          icon={DollarSign}
        />
        <StatsCard
          title="Average Rating"
          value="4.9"
          change={{ value: "98 reviews", trend: "neutral" }}
          icon={Star}
        />
      </div>

      {/* Upcoming Sessions + Chats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="space-y-2">
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  Your scheduled tutoring sessions
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center flex-wrap gap-4 p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
                >

                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-4 mb-1">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {session.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium">{session.student}</h4>
                      </div>
                      <Badge
                        variant={
                          session.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {session.subject}
                    </p>
                    <div className="flex items-center flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.time}
                      </span>
                      <span>{session.date}</span>
                      <span>{session.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Chats</CardTitle>
                <CardDescription>Latest messages from students</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-secondary/50 cursor-pointer"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-medium truncate">
                        {chat.student}
                      </h5>
                      {chat.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {chat.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {chat.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Messages
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Earnings + Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Monthly Earnings
            </CardTitle>
            <CardDescription>
              Your earnings trend over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">
                Earnings chart will be displayed here
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>
              Latest feedback from your students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg border">
                  <div className="flex items-start flex-wrap gap-3">

                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-4 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <h5 className="text-sm font-medium">
                            {review.student}
                          </h5>
                        </div>

                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {review.comment}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Subject: {review.subject}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" size="sm">
              View All Reviews
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Reusable StatsCard Component
// eslint-disable-next-line no-unused-vars
function StatsCard({ title, value, change, icon: Icon }) {
  return (
    <Card className="p-4 flex items-center gap-4 ">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col justify-center items-center text-center">
        <h4 className="text-sm text-muted-foreground">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-xs ${change.trend === "up"
            ? "text-green-500"
            : change.trend === "down"
              ? "text-red-500"
              : "text-muted-foreground"
            }`}
        >
          {change.value}
        </p>
      </div>
    </Card>
  );
}
