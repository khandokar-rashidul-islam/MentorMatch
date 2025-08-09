import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GigCard from "./GigCard";
import CategoryKeywords from "../../components/HomeComponents/CategoryKeywords";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Star,
  Clock,
  DollarSign,
  BookOpen,
  Calculator,
  Globe,
  Code,
  Palette,
  Grid3X3,
  List,
  X,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

// Mock gigs data
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

export default function AllGigs() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const categories = [
    "Programming",
    "Web Development",
    "Data Science",
    "Mathematics",
    "Physics",
    "Languages",
    "Music",
    "Art & Design",
    "Business",
    "Marketing",
    "Photography",
    "Writing",
    "Science",
    "History",
    "Economics",
    "Psychology",
    "Chemistry",
    "Biology",
    "Engineering",
    "Finance",
    "Cooking",
    "Fitness",
    "Yoga",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      searchQuery === "" ||
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gig.skills &&
        gig.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(gig.category);

    const matchesLevel = selectedLevels.length === 0;

    const matchesPrice =
      gig.price >= priceRange[0] && gig.price <= priceRange[1];

    const matchesRating = gig.tutor.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesLevel &&
      matchesPrice &&
      matchesRating
    );
  });
  // Sort logic
  const sortedGigs = [...filteredGigs].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Filter management functions
  const removeFilter = (type, value) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value));
    } else if (type === "level") {
      setSelectedLevels((prev) => prev.filter((level) => level !== value));
    } else if (type === "search") {
      setSearchQuery("");
    } else if (type === "rating") {
      setMinRating(0);
    } else if (type === "price") {
      setPriceRange([0, 100]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange([0, 100]);
    setMinRating(0);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedLevels.length +
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen w-11/12 mx-auto bg-gradient-subtle pt-20">
      <main className=" px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">All Gigs</h1>
          <p className="text-muted-foreground">
            Discover expert tutoring services across various subjects
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-card rounded-lg p-6 mb-6 shadow-elegant">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gigs by title, description, or tags..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Advanced Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-1/3 lg:w-80 shrink-0`}
          >
            <Card className="p-6 h-fit sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 ||
                selectedLevels.length > 0 ||
                searchQuery ||
                minRating > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 100) && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeFilter("search", "")}
                      >
                        Search: "{searchQuery}" <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {selectedCategories.map((category) => (
                      <Badge
                        key={category}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeFilter("category", category)}
                      >
                        {category} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {selectedLevels.map((level) => (
                      <Badge
                        key={level}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeFilter("level", level)}
                      >
                        {level} <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                    {(priceRange[0] > 0 || priceRange[1] < 100) && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeFilter("price", "")}
                      >
                        Price: ${priceRange[0]} - ${priceRange[1]}{" "}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                    {minRating > 0 && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeFilter("rating", "")}
                      >
                        Rating: {minRating}+ stars{" "}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <Separator className="mb-4" />

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories((prev) => [
                              ...prev,
                              category,
                            ]);
                          } else {
                            setSelectedCategories((prev) =>
                              prev.filter((cat) => cat !== category)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Skill Level */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Skill Level</h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox
                        id={level}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedLevels((prev) => [...prev, level]);
                          } else {
                            setSelectedLevels((prev) =>
                              prev.filter((l) => l !== level)
                            );
                          }
                        }}
                      />
                      <label htmlFor={level} className="text-sm cursor-pointer">
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    min={0}
                    step={5}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Rating Filter */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0, 2.0, 1.0].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={(checked) => {
                          setMinRating(checked ? rating : 0);
                        }}
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {rating}+ stars
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">
                  {sortedGigs.length} gig{sortedGigs.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gigs Display */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {sortedGigs.map((gig) =>
                viewMode === "grid" ? (
                  <GigCard gig={gig} />
                ) : (
                  <GigCard gig={gig} />
                )
              )}
            </div>

            {sortedGigs.length == 0 ? (
              <>
                <p>no data found</p>
              </>
            ) : (
              <>
                {/* Load More */}
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    Load More Gigs
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
