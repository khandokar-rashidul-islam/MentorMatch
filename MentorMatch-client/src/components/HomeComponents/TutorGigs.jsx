import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Clock, Users, BookOpen, MessageCircle } from "lucide-react";

const TutorGigs = () => {
  const gigs = [
    {
      id: 1,
      tutor: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
        rating: 4.9,
        reviews: 127,
        badge: "Pro",
      },
      title: "Learn Python Programming from Scratch to Advanced",
      description:
        "Master Python with hands-on projects, real-world examples, and personalized guidance. Perfect for beginners and intermediate learners.",
      category: "Programming",
      price: 45,
      duration: "1 hour",
      students: 89,
      skills: ["Python", "Django", "Flask", "APIs"],
      featured: true,
    },
    {
      id: 2,
      tutor: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg",
        rating: 4.8,
        reviews: 203,
        badge: "Expert",
      },
      title: "Conversational Spanish - Native Speaker",
      description:
        "Improve your Spanish fluency through natural conversations, cultural insights, and personalized practice sessions.",
      category: "Languages",
      price: 35,
      duration: "1 hour",
      students: 156,
      skills: ["Spanish", "Conversation", "Grammar", "Culture"],
      featured: false,
    },
    {
      id: 3,
      tutor: {
        name: "Emma Thompson",
        avatar: "/placeholder.svg",
        rating: 5.0,
        reviews: 78,
        badge: "Pro",
      },
      title: "Guitar Lessons - Acoustic & Electric",
      description:
        "Learn guitar from a professional musician. Covers techniques, music theory, and your favorite songs.",
      category: "Music",
      price: 50,
      duration: "1 hour",
      students: 64,
      skills: ["Guitar", "Music Theory", "Songwriting", "Performance"],
      featured: true,
    },
    {
      id: 4,
      tutor: {
        name: "Dr. James Wilson",
        avatar: "/placeholder.svg",
        rating: 4.9,
        reviews: 341,
        badge: "Expert",
      },
      title: "Advanced Mathematics & Calculus",
      description:
        "PhD in Mathematics offering comprehensive tutoring in calculus, linear algebra, and advanced mathematical concepts.",
      category: "Mathematics",
      price: 65,
      duration: "1 hour",
      students: 234,
      skills: ["Calculus", "Linear Algebra", "Statistics", "Discrete Math"],
      featured: false,
    },
    {
      id: 5,
      tutor: {
        name: "Lisa Park",
        avatar: "/placeholder.svg",
        rating: 4.7,
        reviews: 92,
        badge: "Pro",
      },
      title: "UI/UX Design Fundamentals",
      description:
        "Learn modern design principles, prototyping, and user research from a senior product designer at tech companies.",
      category: "Design",
      price: 55,
      duration: "1 hour",
      students: 87,
      skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
      featured: false,
    },
    {
      id: 6,
      tutor: {
        name: "Ahmed Hassan",
        avatar: "/placeholder.svg",
        rating: 4.8,
        reviews: 156,
        badge: "Expert",
      },
      title: "Data Science & Machine Learning",
      description:
        "Master data analysis, visualization, and machine learning algorithms with real-world projects and datasets.",
      category: "Data Science",
      price: 70,
      duration: "1 hour",
      students: 178,
      skills: ["Python", "TensorFlow", "Pandas", "Visualization"],
      featured: true,
    },
  ];

  return (
    <section className="py-16 bg-background animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in [animation-delay:200ms]">
          <Badge variant="outline" className="mb-4">
            Featured Tutors
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Browse Popular Tutoring Gigs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover expert tutors ready to help you learn. No login required to
            browse and explore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {gigs.map((gig) => (
            <Card className="flex flex-col justify-between h-full rounded-xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between">
                  {/* Tutor Info */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={gig.tutor.avatar}
                        alt={gig.tutor.name}
                      />
                      <AvatarFallback>
                        {gig.tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{gig.tutor.name}</h4>
                        <Badge className="bg-purple-600 text-white text-xs">
                          Pro
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{gig.tutor.rating}</span>
                        <span>({gig.tutor.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Tag */}
                  {gig.featured && (
                    <Badge className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <CardTitle className="text-base font-semibold mt-4 leading-snug">
                  {gig.title}
                </CardTitle>

                {/* Description (truncated) */}
                <CardDescription className="text-sm mt-1 text-gray-600 line-clamp-2">
                  {gig.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col justify-between flex-grow space-y-4 pt-2">
                {/* Skills */}
                <div className="flex flex-wrap gap-2 text-xs">
                  {gig.skills.slice(0, 3).map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-full px-3 py-1 text-sm"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {gig.skills.length > 3 && (
                    <Badge
                      variant="outline"
                      className="rounded-full px-3 py-1 text-sm"
                    >
                      +{gig.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Info Row */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{gig.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{gig.students}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-black">
                      ${gig.price}
                    </div>
                    <div className="text-xs text-gray-400">per session</div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-teal-600 hover:bg-teal-700"
                  >
                    <BookOpen className="h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in [animation-delay:1s]">
          <Button
            variant="outline"
            size="lg"
            className="hover-scale transition-all duration-300"
          >
            View All Tutors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TutorGigs;
