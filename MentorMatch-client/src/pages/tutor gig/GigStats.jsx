import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Clock, Award, CheckCircle, Calendar } from "lucide-react";

const GigStats = () => {
      const stats = [
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9/5",
      subtext: "1,247 reviews",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      label: "Students Taught",
      value: "2,341",
      subtext: "Active learners",
      color: "text-blue-500"
    },
    {
      icon: Clock,
      label: "Response Time",
      value: "2 hours",
      subtext: "Average",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      label: "Success Rate",
      value: "98%",
      subtext: "Student satisfaction",
      color: "text-success"
    }
  ];

  const achievements = [
    "Top Rated Seller",
    "Level 2 Tutor", 
    "Mathematics Expert",
    "Quick Responder",
    "100+ Orders"
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Tutor Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtext}</div>
                </div>
              </div>
              {index < stats.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements & Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement, index) => (
              <Badge key={index} variant="secondary" className="bg-gradient-primary text-primary">
                {achievement}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            {[
              { day: "Monday", hours: "9:00 AM - 6:00 PM", available: true },
              { day: "Tuesday", hours: "9:00 AM - 6:00 PM", available: true },
              { day: "Wednesday", hours: "9:00 AM - 6:00 PM", available: true },
              { day: "Thursday", hours: "9:00 AM - 6:00 PM", available: true },
              { day: "Friday", hours: "9:00 AM - 4:00 PM", available: true },
              { day: "Saturday", hours: "By appointment", available: false },
              { day: "Sunday", hours: "Unavailable", available: false }
            ].map((schedule, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm font-medium">{schedule.day}</span>
                <span className={`text-xs ${schedule.available ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Badge variant="outline" className="text-success border-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              Available Today
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GigStats