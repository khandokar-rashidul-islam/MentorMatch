import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GigCard from "./GigCard";
import "keen-slider/keen-slider.min.css";

import CategoryKeywords from "../../components/HomeComponents/CategoryKeywords";


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

  const navigate = useNavigate();
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

const filteredGigs = gigs.filter(gig => {
  const matchesSearch =
    searchQuery === "" ||
    gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (gig.skills && gig.skills.some(skill =>
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    ));

  const matchesCategory =
    selectedCategories.length === 0 || selectedCategories.includes(gig.category);

  const matchesLevel =
    selectedLevels.length === 0;

  const matchesPrice =
    gig.price >= priceRange[0] && gig.price <= priceRange[1];

  const matchesRating =
    gig.tutor.rating >= minRating;

  return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesRating;
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
      setSelectedCategories(prev => prev.filter(cat => cat !== value));
    } else if (type === "level") {
      setSelectedLevels(prev => prev.filter(level => level !== value));
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

  const activeFiltersCount = selectedCategories.length + selectedLevels.length +
    (priceRange[0] > 0 || priceRange[1] < 100 ? 1 : 0) + (minRating > 0 ? 1 : 0) + (searchQuery ? 1 : 0);

  return (
    <div className="p-6 space-y-6 w-11/12 pt-25 mx-auto">
      {/* Search & Category Tabs */}
      <div className="flex flex-col  gap-4">
        <Input
          placeholder="Search for gigs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
        />
        <CategoryKeywords/>


      </div>

      {/* Gigs Grid */}
      <div className=" grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
