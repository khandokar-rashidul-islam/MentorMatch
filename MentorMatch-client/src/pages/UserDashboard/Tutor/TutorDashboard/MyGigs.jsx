import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Spinner } from "@/components/ui/spinner";
import { useGetMyGigsQuery } from "../../../../redux/features/mentor/mentor.api";

// const myGigs = [ // { // id: 1, // status: "active", // tutor: { // name: "Sarah Chen ", // avatar: "/placeholder.svg", // rating: 4.9, // reviews: 127, // badge: "Pro", // }, // title: "Learn Python Programming from Scratch to Advanced ", // description: // "Master Python with hands-on projects, real-world examples, and personalized guidance. Perfect for beginners and intermediate learners.", // category: "Programming", // price: 45, // duration: "1 hour", // students: 89, // skills: ["Python", "Django", "Flask", "APIs"], // featured: true, // } // ];
export default function MyGigs() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  // RTK Query hook
  const { data, isLoading, isError } = useGetMyGigsQuery();
  const gigs = data?.data || [];

  // Loading state
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );

  //Error state
  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load gigs. Please try again later.
      </div>
    );
  }

  //Empty state
  if (gigs.length === 0) {
    return (
      <div className="text-center py-20">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-muted-foreground">You have no gigs yet.</p>
        <Link to="/dashboard/mentor/create-gigs">
          <Button className="mt-4">Create your first gig</Button>
        </Link>
      </div>
    );
  }

  // Search, sort, and filter logic

  const filteredGigs = gigs.filter(
    (g) =>
      g.gigTitle.toLowerCase().includes(search.toLowerCase()) ||
      g.relatedTopics?.some((topic) =>
        topic.toLowerCase().includes(search.toLowerCase())
      )
  );

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    if (sortBy === "price")
      return b.plans.instant.price - a.plans.instant.price;
    return a.gigTitle.localeCompare(b.gigTitle);
  });

  const getGigsByStatus = (status) =>
    status === "all"
      ? sortedGigs
      : sortedGigs.filter((g) => g.status === status);

  // Action handlers
  const handleStatusToggle = (id) => {
    const gig = gigs.find((g) => g._id === id);
    if (!gig) return;
    toast({
      title: "Status Updated",
      description: `"${gig.gigTitle}" status changed.`,
    });
  };

  const handleShare = (id) => {
    const gig = gigs.find((g) => g._id === id);
    if (!gig) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/gig-details/${id}`
    );
    toast({
      title: "Link Copied",
      description: `Share link for "${gig.gigTitle}" copied.`,
    });
  };

  const handleDelete = (gig) => {
    if (!gig) return;
    if (window.confirm(`Are you sure you want to delete "${gig.gigTitle}"?`)) {
      toast({
        title: "Gig Deleted",
        description: `"${gig.gigTitle}" has been removed.`,
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-background space-y-6 w-11/12 mx-auto">
      <Toaster />

      {/* ===== HEADER ===== */}
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

      {/* ===== FILTER CONTROLS ===== */}
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

        <div className="w-full flex items-center justify-between flex-wrap gap-4">
          <div className="relative w-full sm:w-2/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search gigs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background transition"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
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

      {/* ===== GIGS LIST ===== */}
      {activeTab !== "analytics" ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6"
              : "space-y-4"
          }
        >
          {getGigsByStatus(activeTab).map((gig, idx) => (
            <div key={gig._id} className="h-full">
              <div
                className="animate-fade-in h-full "
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <MyGigsCard
                  gig={gig}
                  viewMode={viewMode}
                  onStatusToggle={handleStatusToggle}
                  onShare={handleShare}
                  onDelete={handleDelete}
                  className="h-full"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
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
