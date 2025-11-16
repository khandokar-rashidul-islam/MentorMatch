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
  ArrowDown,
} from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useGetAllGigsQuery } from "@/redux/features/learner/learner.api";
import GigCardSkeleton from "../../components/shared/GigCardSkeleton";

// Mock gigs data
// const gigs = [
//   {
//     id: 1,
//     tutor: {
//       name: "Sarah Chen ",
//       avatar: "/placeholder.svg",
//       rating: 4.9,
//       reviews: 127,
//       badge: "Pro",
//     },
//     title: "Learn Python Programming from Scratch to Advanced ",
//     description:
//       "Master Python with hands-on projects, real-world examples, and personalized guidance. Perfect for beginners and intermediate learners.",
//     category: "Programming",
//     price: 45,
//     duration: "1 hour",
//     students: 89,
//     skills: ["Python", "Django", "Flask", "APIs"],
//     featured: true,
//   },
//   {
//     id: 2,
//     tutor: {
//       name: "Michael Rodriguez",
//       avatar: "/placeholder.svg",
//       rating: 4.8,
//       reviews: 203,
//       badge: "Expert",
//     },
//     title: "Conversational Spanish - Native Speaker",
//     description:
//       "Improve your Spanish fluency through natural conversations, cultural insights, and personalized practice sessions.",
//     category: "Languages",
//     price: 35,
//     duration: "1 hour",
//     students: 156,
//     skills: ["Spanish", "Conversation", "Grammar", "Culture"],
//     featured: false,
//   },
//   {
//     id: 3,
//     tutor: {
//       name: "Emma Thompson",
//       avatar: "/placeholder.svg",
//       rating: 5.0,
//       reviews: 78,
//       badge: "Pro",
//     },
//     title: "Guitar Lessons - Acoustic & Electric",
//     description:
//       "Learn guitar from a professional musician. Covers techniques, music theory, and your favorite songs.",
//     category: "Music",
//     price: 50,
//     duration: "1 hour",
//     students: 64,
//     skills: ["Guitar", "Music Theory", "Songwriting", "Performance"],
//     featured: true,
//   },
//   {
//     id: 4,
//     tutor: {
//       name: "Dr. James Wilson",
//       avatar: "/placeholder.svg",
//       rating: 4.9,
//       reviews: 341,
//       badge: "Expert",
//     },
//     title: "Advanced Mathematics & Calculus",
//     description:
//       "PhD in Mathematics offering comprehensive tutoring in calculus, linear algebra, and advanced mathematical concepts.",
//     category: "Mathematics",
//     price: 65,
//     duration: "1 hour",
//     students: 234,
//     skills: ["Calculus", "Linear Algebra", "Statistics", "Discrete Math"],
//     featured: false,
//   },
//   {
//     id: 5,
//     tutor: {
//       name: "Lisa Park",
//       avatar: "/placeholder.svg",
//       rating: 4.7,
//       reviews: 92,
//       badge: "Pro",
//     },
//     title: "UI/UX Design Fundamentals",
//     description:
//       "Learn modern design principles, prototyping, and user research from a senior product designer at tech companies.",
//     category: "Design",
//     price: 55,
//     duration: "1 hour",
//     students: 87,
//     skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
//     featured: false,
//   },
//   {
//     id: 6,
//     tutor: {
//       name: "Ahmed Hassan",
//       avatar: "/placeholder.svg",
//       rating: 4.8,
//       reviews: 156,
//       badge: "Expert",
//     },
//     title: "Data Science & Machine Learning",
//     description:
//       "Master data analysis, visualization, and machine learning algorithms with real-world projects and datasets.",
//     category: "Data Science",
//     price: 70,
//     duration: "1 hour",
//     students: 178,
//     skills: ["Python", "TensorFlow", "Pandas", "Visualization"],
//     featured: true,
//   },
// ];
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
export default function AllGigs() {
  const { data, isLoading, error } = useGetAllGigsQuery({});
  console.log(data);
  const gigs = data?.data || [];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [visibleGigsCount, setVisibleGigsCount] = useState(9);

  const displayedCategories = categories.slice(0, visibleCount);

  const handleLoadMore = () => {
    const newCount = Math.min(visibleCount + 10, categories.length);
    setVisibleCount(newCount);
  };
  const handleLoadless = () => {
    setVisibleCount(10);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedLevels, setSelectedLevels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const filteredGigs = gigs.filter((gig) => {
    const matchesSearch =
      searchQuery === "" ||
      gig.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.aboutGig.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (gig.services &&
        gig.services.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ));

    const matchesCategory =
      selectedCategories.length === 0 ||
      gig.keywords?.some((keyword) =>
        selectedCategories
          .map((cat) => cat.toLowerCase())
          .includes(keyword.toLowerCase())
      );

    //const matchesLevel = selectedLevels.length === 0;

    const matchesPrice =
      gig.plans.instant.price >= priceRange[0] &&
      gig.plans.instant.price <= priceRange[1];

    //const matchesRating = gig.tutor.rating >= minRating;

    return (
      matchesSearch &&
      matchesCategory &&
      // && matchesLevel
      matchesPrice
      //&& matchesRating
    );
  });
  // Sort logic

  const sortedGigs = [...filteredGigs].sort((a, b) => {
    const aInstant = a.plans?.instant?.price ?? 0;
    const bInstant = b.plans?.instant?.price ?? 0;

    switch (sortBy) {
      case "price-low":
        // Sort by lowest available plan price (instant as baseline)
        return aInstant - bInstant;

      case "price-high":
        // Sort by highest available plan price (elite as baseline)
        return bInstant - aInstant;

      // case "rating":
      //   return (b.rating ?? 0) - (a.rating ?? 0);

      case "name":
        return a.gigTitle.localeCompare(b.gigTitle);

      default:
        return 0;
    }
  });
  console.log(sortedGigs);

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
      setPriceRange([0, 1000]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedLevels.length +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  // if (isLoading)
  //   return (
  //     <div className="min-h-screen pt-25 flex justify-center items-start">
  //       Loading gigs...
  //     </div>
  //   );
  if (error)
    return (
      <div className="min-h-screen pt-25 flex justify-center items-start text-red-500">
        Error fetching gigs!
      </div>
    );

  return (
    <div className="min-h-screen w-11/12 mx-auto bg-gradient-subtle pt-28">
      <main className=" ">
        {/* Search Bar */}
        <div className="bg-card rounded-lg p-6 mb-3 shadow-elegant lg:hidden ">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
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
              className="lg:w-auto lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>
        </div>

        <div
          className={`flex ${
            showFilters ? "flex-col sm:flex-row" : "flex-row"
          } gap-6`}
        >
          {/* ------------------------Advanced  Sidebar Filters--------------------*/}

          <div
            className={`mb-8 ${
              showFilters ? "block" : "hidden"
            } lg:block  lg:w-60 shrink-0`}
          >
            <Card className="p-6 h-fit sticky top-4 rounded-md ">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center ">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </div>

                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
              </div>
              <Separator className="mb-4" />
              {/* Active Filters */}
              {(selectedCategories.length > 0 ||
                selectedLevels.length > 0 ||
                searchQuery ||
                minRating > 0 ||
                priceRange[0] > 0 ||
                priceRange[1] < 100) && (
                <div className="">
                  <div className="text-sm text-primary font-medium mb-2">
                    Active Filters:
                  </div>
                  <div className="flex flex-wrap gap-2 overflow-hidden">
                    {searchQuery && (
                      <Badge
                        variant="secondary"
                        className="cursor-pointer "
                        onClick={() => removeFilter("search", "")}
                      >
                        Search: `$
                        {searchQuery.length >= 10
                          ? `${searchQuery.substring(0, 10)} ... `
                          : searchQuery}
                        ` <X className="h-3 w-3 ml-1" />
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
              {/* Price Range */}
              <div className="mb-6 cursor-pointer">
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

              <Separator className="mb-4" />

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>

                <div className={`space-y-2 transition-all duration-300`}>
                  {displayedCategories.map((category) => (
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

                {visibleCount < categories.length && (
                  <button
                    onClick={handleLoadMore}
                    className=" mt-4 text-primary text-sm hover:underline"
                  >
                    Load more ...
                  </button>
                )}
                {visibleCount == categories.length && (
                  <button
                    onClick={handleLoadless}
                    className=" mt-4 text-primary text-sm hover:underline"
                  >
                    see less ...
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* ------------------Main Content ------------------------*/}

          <div className="flex-1 min-w-0 mb-8">
            {/* Results Header */}
            <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-4 rounded-md">
              {/* Left - Gigs count */}
              <div className="px-4 py-1 border rounded-md font-semibold text-muted-foreground shrink-0">
                {sortedGigs.length} Gig{sortedGigs.length !== 1 ? "s" : ""}{" "}
                found
              </div>

              {/* Middle - Search input (flex-grow to take all remaining space) */}
              <div className="relative flex-grow w-full ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  placeholder="Search gigs by title, description, or tags..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Right - View buttons & Sort */}
              <div className="flex items-center gap-3 shrink-0">
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
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Gigs Display */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {isLoading &&
                Array.from({ length: 9 }).map((_, i) => (
                  <GigCardSkeleton key={i} />
                ))}
              {sortedGigs
                .slice(0, visibleGigsCount)
                .map((gig) =>
                  viewMode === "grid" ? (
                    <GigCard key={gig._id} gig={gig} />
                  ) : (
                    <GigCard gig={gig} key={gig._id} />
                  )
                )}
            </div>

            {sortedGigs.length == 0 ? (
              <>
                <p>no data found</p>
              </>
            ) : sortedGigs.length > visibleGigsCount ? (
              <>
                {/* Load More */}
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setVisibleGigsCount((prev) => prev + 9);
                    }}
                  >
                    Load More Gigs
                  </Button>
                </div>
              </>
            ) : (
              <div>
                {sortedGigs.length > 9 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setVisibleGigsCount(9);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Show Less
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
