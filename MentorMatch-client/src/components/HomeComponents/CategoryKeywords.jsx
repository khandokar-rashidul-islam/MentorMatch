import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const CategoryKeywords = () => {
  const [selected, setSelected] = useState(null);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 7,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 5, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(max-width: 480px)": {
        slides: { perView: 2, spacing: 8 },
      },
    },
  });

  const handleSelect = (category) => {
    setSelected(category);
  };

  const slidePrev = () => {
    instanceRef.current?.prev();
  };

  const slideNext = () => {
    instanceRef.current?.next();
  };

  return (
    <div className=" container mx-auto  py-10 border-b bg-background">
      <div className="flex items-center gap-2">
        {/* Prev Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={slidePrev}
          className="h-8 w-8 p-0 transition-transform hover:scale-105"
          aria-label="Previous categories"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider white flex-1">
          {categories.map((category) => (
            <div className="keen-slider__slide hover:scale-105" key={category}>
              <Badge
                onClick={() => handleSelect(category)}
                variant={selected === category ? "default" : "outline"}
                className={`cursor-pointer transition-all px-6 py-2 duration-300 ${
                  selected === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {category}
              </Badge>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={slideNext}
          className="h-8 w-8 p-0 transition-transform hover:scale-105"
          aria-label="Next categories"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CategoryKeywords;
