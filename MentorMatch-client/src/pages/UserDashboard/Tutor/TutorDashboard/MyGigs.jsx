import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, } from "@/components/ui/tabs";

import {

  Plus,
  Search,
  Grid3X3,
  List,
  FolderOpen,
  BarChart3,
} from "lucide-react";
import {toast, Toaster } from "../../../../hooks/use-toast";
import { Link } from "react-router";
import MyGigsCard from "./MyGigsCard";

const myGigs = [
  {
    id: 1,
    tutor: {
      name: "Sarah Chen ",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 127,
      badge: "Pro",
    },
    title: "Learn Python Programming from Scratch to Advanced ",
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

export default function MyGigs() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("all");
  const [gigs, setGigs] = useState(myGigs);
  const [sortBy, setSortBy] = useState("title");
 
  const filteredGigs = gigs.filter(
    (g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase())
  );

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "revenue") return b.revenue - a.revenue;
    return a.title.localeCompare(b.title);
  });

  const getGigsByStatus = (status) =>
    status === "all"
      ? sortedGigs
      : sortedGigs.filter((g) => g.status === status);

  const handleStatusToggle = (id) => {
    setGigs((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, status: g.status === "active" ? "paused" : "active" }
          : g
      )
    );
    const gigName = gigs.find((g) => g.id === id)?.title || "Gig";
    toast({
      title: "Status Updated",
      description: `${gigName} status changed.`,
    });
  };

  const handleShare = (id) => {
    const gig = gigs.find((g) => g.id === id);
    if (gig) {
      navigator.clipboard.writeText(`Check out my gig: ${gig.title}`);
      toast({
        title: "Link Copied",
        description: `Share link for "${gig.title}" copied.`,
      });
    }
  };

  const handleDuplicate = (id) => {
    const gig = gigs.find((g) => g.id === id);
    if (gig) {
      const newGig = {
        ...gig,
        id: Math.max(...gigs.map((g) => g.id)) + 1,
        title: `${gig.title} (Copy)`,
        status: "paused",
        bookings: 0,
        revenue: 0,
        lastUpdated: "just now",
      };
      setGigs((prev) => [...prev, newGig]);
      toast({
        title: "Gig Duplicated",
        description: `"${gig.title}" duplicated.`,
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen p-6 bg-background space-y-6">
      {/* Header */}
      <Toaster />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg">
            <FolderOpen className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              My Gigs
            </h1>
            <p className="text-muted-foreground">
              Manage your tutoring services and track performance
            </p>
          </div>
        </div>
        <Link to="/dashboard/mentor/create-gigs">
          <Button
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
            // onClick={() =>
            //   toast({
            //     title: "Create New Gig",
            //     description: "Redirecting to creation page...",
            //   })
            // }
          >
            <Plus className="w-4 h-4 mr-2" /> Create New Gig
          </Button>
        </Link>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/50 hover:bg-muted transition-colors">
            <TabsTrigger value="all">All ({gigs.length})</TabsTrigger>
            <TabsTrigger value="active">
              Active ({gigs.filter((g) => g.status === "active").length})
            </TabsTrigger>
            <TabsTrigger value="paused">
              Paused ({gigs.filter((g) => g.status === "paused").length})
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background hover:bg-muted/50 transition"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
          <div className="flex border rounded-lg p-1 bg-muted/20">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gigs */}
      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {getGigsByStatus(activeTab).map((gig, idx) => (
          <div
            key={gig.id}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <MyGigsCard
              gig={gig}
              viewMode={viewMode}
              onStatusToggle={handleStatusToggle}
              onShare={handleShare}
              onDuplicate={handleDuplicate}
            />
          </div>
        ))}
      </div>

      {/* Analytics */}
      {activeTab === "analytics" && (
        <Card className="p-8 text-center animate-fade-in hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
          <p className="text-muted-foreground">
            Detailed analytics and insights for your gigs will be available
            here.
          </p>
          <Button
            variant="outline"
            className="mt-4 hover:scale-105 transition-transform"
          >
            Get Notified
          </Button>
        </Card>
      )}
    </div>
  );
}
