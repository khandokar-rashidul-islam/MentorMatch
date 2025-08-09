import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock gigs data
const gigsData = [
  {
    id: 1,
    title: "Professional Logo Design",
    category: "Design",
    price: 50,
    description: "Unique and modern logos for your brand.",
    image: "https://via.placeholder.com/300x200.png?text=Logo+Design",
  },
  {
    id: 2,
    title: "Responsive Website Development",
    category: "Development",
    price: 300,
    description: "Full-stack development with modern frameworks.",
    image: "https://via.placeholder.com/300x200.png?text=Website+Dev",
  },
  {
    id: 3,
    title: "SEO Optimization",
    category: "Marketing",
    price: 120,
    description: "Rank higher on search engines with my SEO skills.",
    image: "https://via.placeholder.com/300x200.png?text=SEO+Service",
  },
  {
    id: 4,
    title: "UI/UX Mobile App Design",
    category: "Design",
    price: 150,
    description: "User-focused mobile app designs for better engagement.",
    image: "https://via.placeholder.com/300x200.png?text=UI%2FUX+Design",
  },
  {
    id: 5,
    title: "Facebook & Instagram Ads",
    category: "Marketing",
    price: 100,
    description: "Highly targeted social media ad campaigns.",
    image: "https://via.placeholder.com/300x200.png?text=Social+Ads",
  },
  {
    id: 6,
    title: "E-commerce Store Setup",
    category: "Development",
    price: 500,
    description: "Custom online store with secure payment gateways.",
    image: "https://via.placeholder.com/300x200.png?text=Ecommerce",
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
            <Card
              key={gig.id}
              className="group overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="overflow-hidden">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{gig.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{gig.category}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 line-clamp-2">{gig.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">${gig.price}</span>
                  <Button size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
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
