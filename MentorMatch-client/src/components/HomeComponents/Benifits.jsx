import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  GraduationCap,
  DollarSign,
  Clock,
  Globe,
  TrendingUp,
  Heart,
  BookOpen,
  Users,
} from "lucide-react";

const Benefits = () => {
  const learnerBenefits = [
    {
      icon: GraduationCap,
      title: "Personalized Learning",
      description:
        "One-on-one sessions tailored to your learning style and pace",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Learn at your convenience with 24/7 availability",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Connect with expert tutors from around the world",
    },
    {
      icon: DollarSign,
      title: "Competitive Rates",
      description: "Negotiate fair prices that fit your budget",
    },
  ];

  const tutorBenefits = [
    {
      icon: DollarSign,
      title: "Set Your Rates",
      description: "Full control over pricing and earning potential",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Build a sustainable tutoring business on our platform",
    },
    {
      icon: Users,
      title: "Find Students",
      description:
        "Connect with motivated learners actively seeking your expertise",
    },
    {
      icon: Heart,
      title: "Share Your Passion",
      description: "Make a meaningful impact by teaching what you love",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Benefits
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Win-Win for Everyone</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're looking to learn something new or share your
            expertise, MentorMatch creates value for both learners and
            educators.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Learner Side */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
                <h3 className="text-2xl font-bold">For Learners</h3>
              </div>
              <p className="text-muted-foreground">
                Discover new skills and knowledge with personalized guidance
                from expert tutors.
              </p>
            </div>

            <div className="grid gap-6">
              {learnerBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">
                          {benefit.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button variant="default" size="lg" className="w-full lg:w-auto">
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning Today
            </Button>
          </div>

          {/* Tutor Side */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                <Users className="h-8 w-8 text-secondary" />
                <h3 className="text-2xl font-bold">For Educators</h3>
              </div>
              <p className="text-muted-foreground">
                Turn your knowledge into income while making a meaningful impact
                on others.
              </p>
            </div>

            <div className="grid gap-6">
              {tutorBenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-secondary">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-secondary/10">
                          <Icon className="h-5 w-5 text-secondary" />
                        </div>
                        <CardTitle className="text-lg">
                          {benefit.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {benefit.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button variant="secondary" size="lg" className="w-full lg:w-auto">
              <Users className="h-5 w-5 mr-2" />
              Become a Tutor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
