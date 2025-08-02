import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Video,
  MonitorSpeaker,
  Star,
  CreditCard,
  Calendar,
  Users,
  BookOpen,
  Shield,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Chat Negotiation",
      description:
        "Real-time messaging to discuss session details, negotiate rates, and build rapport before learning begins.",
      badge: "Core Feature",
    },
    {
      icon: Video,
      title: "HD Video & Audio Calls",
      description:
        "Crystal-clear video and audio sessions for immersive learning experiences with your chosen tutor.",
      badge: "Quality Assured",
    },
    {
      icon: MonitorSpeaker,
      title: "Screen Sharing",
      description:
        "Collaborative learning through screen sharing for coding, design, presentations, and technical subjects.",
      badge: "Interactive",
    },
    {
      icon: Star,
      title: "Rating & Reviews",
      description:
        "Transparent feedback system ensuring quality connections and trustworthy learning experiences.",
      badge: "Trust & Safety",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description:
        "Protected transactions with multiple payment options. Tutors set their rates, learners pay securely.",
      badge: "Secure",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description:
        "Book sessions that fit your schedule. Tutors manage availability, learners choose convenient times.",
      badge: "Flexible",
    },
    {
      icon: Users,
      title: "Global Community",
      description:
        "Connect with tutors and learners worldwide. Access diverse expertise across all time zones.",
      badge: "Global",
    },
    {
      icon: BookOpen,
      title: "All Subjects",
      description:
        "From programming to languages, music to mathematics - find expertise in virtually any subject.",
      badge: "Comprehensive",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description:
        "Background-checked tutors with verified credentials and expertise for your peace of mind.",
      badge: "Verified",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="w-11/12 mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border border-primary/20">
            Platform Features
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to Learn & Teach
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools and features designed to create the perfect learning
            environment for both students and educators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 rounded-lg bg-secondary ">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
