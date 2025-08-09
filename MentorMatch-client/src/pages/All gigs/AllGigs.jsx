import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GigCard from "./GigCard";

// Mock gigs data
const gigsData = [
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

export default function AllGigs() {
  const categories = ["All", "Design", "Development", "Marketing"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGigs = useMemo(() => {
    return gigsData.filter((gig) => {
      const matchesCategory =
        activeCategory === "All" || gig.category === activeCategory;
      const matchesSearch = gig.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Search & Category Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Input
          placeholder="Search for gigs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/2"
        />
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full md:w-auto"
        >
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Gigs Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <GigCard gig={gig} key={gig.id}/>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No gigs found.
          </p>
        )}
      </div>
    </div>
  );
}
