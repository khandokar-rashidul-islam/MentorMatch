import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Star,
  Clock,
  DollarSign,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for detailed stats
const performanceMetrics = [
  { label: "Session Completion Rate", value: 94, trend: "+2%" },
  { label: "Student Satisfaction", value: 98, trend: "+5%" },
  { label: "Response Time (avg)", value: 85, trend: "+12%" },
  { label: "Rebooking Rate", value: 78, trend: "+8%" },
];

const topSubjects = [
  { subject: "Mathematics", sessions: 145, percentage: 42 },
  { subject: "Physics", sessions: 89, percentage: 26 },
  { subject: "Chemistry", sessions: 67, percentage: 19 },
  { subject: "Biology", sessions: 47, percentage: 13 },
];

const studentEngagement = [
  { type: "New Students", count: 34, percentage: 27 },
  { type: "Returning Students", count: 93, percentage: 73 },
];

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 85 },
  { stars: 4, count: 24, percentage: 13 },
  { stars: 3, count: 3, percentage: 2 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 },
];

const insights = [
  {
    title: "Peak Teaching Hours",
    description:
      "Your busiest teaching time is 6-8 PM weekdays. Consider opening more slots during this time.",
    type: "opportunity",
  },
  {
    title: "Top-Rated Subject",
    description:
      "Students give highest ratings in Mathematics sessions. Consider expanding this offering.",
    type: "success",
  },
  {
    title: "Response Time Improvement",
    description:
      "Your response time has improved by 12% this month. Keep up the great work!",
    type: "success",
  },
];

export default function TutorStats() {
  return (
    <div className="p-6 space-y-6 pt-20">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Performance & Statistics</h1>
        <p className="text-muted-foreground">
          Detailed analytics and insights into your mentoring performance
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select defaultValue="month">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export PDF
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value="$12,450"
          change={{ value: "+23%", trend: "up" }}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Sessions"
          value="348"
          change={{ value: "+8%", trend: "up" }}
          icon={Calendar}
        />
        <StatsCard
          title="Students Taught"
          value="127"
          change={{ value: "+12%", trend: "up" }}
          icon={Users}
        />
        <StatsCard
          title="Average Rating"
          value="4.9"
          change={{ value: "183 reviews", trend: "neutral" }}
          icon={Star}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Earnings Analytics
            </CardTitle>
            <CardDescription>
              Monthly earnings breakdown and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  Earnings chart visualization
                </p>
                <p className="text-sm text-muted-foreground">
                  Line/Bar chart showing monthly trends
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Engagement</CardTitle>
            <CardDescription>
              New vs returning students breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentEngagement.map((item) => (
                <div
                  key={item.type}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.type === "New Students"
                          ? "bg-primary"
                          : "bg-green-500"
                      }`}
                    />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {item.count}
                    </span>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
              ))}
              <div className="mt-4 h-48 flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">
                  Donut chart visualization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>
              Key performance indicators and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {performanceMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{metric.value}%</span>
                      <Badge variant="outline" className="text-green-600">
                        {metric.trend}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Subjects Taught</CardTitle>
            <CardDescription>
              Most popular subjects by session count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSubjects.map((subject) => (
                <div key={subject.subject}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {subject.subject}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {subject.sessions} sessions
                    </span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>
              Breakdown of student ratings received
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <Progress value={rating.percentage} className="h-2" />
                  </div>
                  <div className="flex items-center gap-2 w-20 justify-end">
                    <span className="text-sm text-muted-foreground">
                      {rating.count}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {rating.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teaching Schedule Heatmap</CardTitle>
            <CardDescription>
              Your busiest teaching hours and days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border border-dashed rounded-lg">
              <div className="text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Schedule heatmap</p>
                <p className="text-sm text-muted-foreground">
                  Activity by day and time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Actionable Insights</CardTitle>
          <CardDescription>
            Personalized recommendations to improve your performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === "success"
                    ? "border-green-300 bg-green-50"
                    : "border-primary/20 bg-primary/5"
                }`}
              >
                <h4 className="font-medium mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
                <Badge
                  variant="outline"
                  className={`mt-2 ${
                    insight.type === "success"
                      ? "text-green-600"
                      : "text-primary"
                  }`}
                >
                  {insight.type === "success" ? "Great Work!" : "Opportunity"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable StatsCard Component
// eslint-disable-next-line no-unused-vars
function StatsCard({ title, value, change, icon: Icon }) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <div className="p-3 rounded-full bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-sm text-muted-foreground">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
        <p
          className={`text-xs ${
            change.trend === "up"
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
