import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

const SearchQuery = () => {
  const popularSearches = [
    "Python",
    "English",
    "Guitar",
    "Math",
    "Spanish",
    "Photoshop",
  ];
  const category =[
                      "Programming",
                      "Languages",
                      "Music",
                      "Mathematics",
                      "Science",
                      "Business",
                      "Design",
                    ]
  return (
    <section className="py-12 bg-muted/30 animate-fade-in">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 animate-fade-in [animation-delay:200ms]">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Find the Perfect Tutor
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Search through thousands of expert tutors and find your ideal
              learning partner
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-card p-6 sm:p-8 rounded-xl shadow-md border animate-scale-in [animation-delay:400ms] transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <Input
                  placeholder="What do you want to learn? (e.g., Python, Spanish, Guitar)"
                  className="h-12 text-base focus:scale-[1.02] transition-transform"
                />
              </div>

              {/* Dropdowns & Button */}
              <div className="flex flex-col lg:items-center sm:flex-row gap-2">
                {/* Category */}
                <Select>
                  <SelectTrigger className="py-6 w-full sm:w-40 ">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.map((item) => (
                      <SelectItem key={item} value={item.toLowerCase()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Budget */}
                <Select>
                  <SelectTrigger className="py-6 w-full sm:w-32">
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-25">Under $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="over-100">Over $100</SelectItem>
                  </SelectContent>
                </Select>

                {/* Search Button */}
                <Button
                  size="lg"
                  className="h-12 px-6 sm:px-8 w-full sm:w-auto transition-transform hover:scale-[1.03]"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Search Terms */}
            <div className="flex flex-wrap items-center gap-2 mt-6 animate-fade-in [animation-delay:600ms]">
              <span className="text-md text-muted-foreground">
                Popular searches:
              </span>
              {popularSearches.map((term) => (
                <Button
                  key={term}
                  variant="ghost"
                  size="sm"
                  className="h-7 text-sm px-3 py-1 transition-all hover:scale-105"
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchQuery;
