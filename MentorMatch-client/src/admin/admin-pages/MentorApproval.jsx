import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Eye } from "lucide-react";

const pendingMentors = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    expertise: "Software Engineering",
    experience: "10+ years",
    avatar: "",
    appliedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria.garcia@email.com",
    expertise: "Product Management",
    experience: "8+ years",
    avatar: "",
    appliedDate: "2024-01-14",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@email.com",
    expertise: "Data Science",
    experience: "6+ years",
    avatar: "",
    appliedDate: "2024-01-13",
  },
];
const MentorApproval = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mentor Approval</h1>
        <p className="text-muted-foreground mt-1">
          Review and approve mentor applications
        </p>
      </div>

      <div className="grid gap-4">
        {pendingMentors.map((mentor, index) => (
          <Card
            key={mentor.id}
            className="glass-effect hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{mentor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {mentor.email}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {mentor.expertise}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-accent/10 text-accent border-accent/20"
                      >
                        {mentor.experience}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-warning/10 text-warning border-warning/20"
                >
                  Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Applied on {new Date(mentor.appliedDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-gradient-primary hover:opacity-90"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MentorApproval;
