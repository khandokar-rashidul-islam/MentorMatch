import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Search,
  Grid3X3,
  List,
  FolderOpen,
  BarChart3,
} from "lucide-react";
import { toast, Toaster } from "../../../../hooks/use-toast";
import { Link } from "react-router";
import MyGigsCard from "./MyGigsCard";

const myGigs = [
  {
    id: 1,
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    status: "active",
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
    if (sortBy === "rating") return b.tutor.rating - a.tutor.rating;
    return a.title.localeCompare(b.title);
  });

  const getGigsByStatus = (status) =>
    status === "all" ? sortedGigs : sortedGigs.filter((g) => g.status === status);

  // Actions
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
      };
      setGigs((prev) => [...prev, newGig]);
      toast({
        title: "Gig Duplicated",
        description: `"${gig.title}" duplicated.`,
      });
    }
  };

  const handleDelete = (gig) => {
    if (!gig) return;
    if (window.confirm(`Are you sure you want to delete "${gig.title}"?`)) {
      setGigs((prev) => prev.filter((g) => g.id !== gig.id));
      toast({
        title: "Gig Deleted",
        description: `"${gig.title}" has been removed.`,
      });
    }
  };

  return (
    <div className="pt-28 min-h-screen p-6 bg-background space-y-6 w-11/12 mx-auto">
      <Toaster />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
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
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" /> Create New Gig
          </Button>
        </Link>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-4 w-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted/50 hover:bg-muted transition-colors w-full h-full flex flex-wrap">
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

        <div className="w-full flex items-center justify-between flex-wrap  gap-4">
          <div className="relative w-full sm:w-2/3 ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 "
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background transition  "
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <div className="flex gap-1 border rounded-md p-1 bg-muted/20">
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
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
              onDelete={handleDelete}
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
