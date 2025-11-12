import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetGigsByUserIdQuery } from "../../redux/features/learner/learner.api";


const GigSuggestions = ({gig}) => {

const userId = gig.data.user.id;
console.log("GigSuggestions User ID:", userId);
const { data, isLoading } = useGetGigsByUserIdQuery(userId);
  const gigs = data?.data || [];
  if (isLoading || gigs.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <Carousel className="w-full ">
        <CarouselContent className="-ml-1">
          {gigs.map((gig, index) => (
            <CarouselItem
              key={index}
              className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <Card className="h-full">
                {/* Make all cards perfectly square */}
                <CardContent className="aspect-square flex flex-col justify-between p-4 overflow-hidden">
                  <div className="flex flex-col gap-2 h-full">
                    <div className="text-lg sm:text-xl font-semibold truncate">
                      {gig.gigTitle}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-3">
                      {gig.aboutGig}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Buttons container in bottom-right corner */}
        <div className="absolute mt-1 right-2 flex gap-2 z-10">
          <CarouselPrevious className="static translate-y-0 rounded-sm translate-x-0 bg-white/80 hover:bg-white shadow-md" />
          <CarouselNext className="static translate-y-0 translate-x-0 rounded-sm bg-white/80 hover:bg-white shadow-md" />
        </div>
      </Carousel>
    </div>
  );
};

export default GigSuggestions;
