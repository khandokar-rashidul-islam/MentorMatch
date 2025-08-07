import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
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
  )
}

export default About