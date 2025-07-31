import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Star, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/banner.png";

const Hero = () => {
  return (
    <div className=" bg-gradient-to-br from-muted/30 to-background">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          <Badge variant="secondary" className="w-fit animate-scale-in">
            ✨ Connecting Learners & Educators Worldwide
          </Badge>

          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Learn Anything,
              <span className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 bg-clip-text text-transparent">
                {" "}
                Teach Everything
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Join MentorMatch — the freelance marketplace where knowledge meets
              opportunity. Connect with expert tutors or share your expertise
              with eager learners through personalized video sessions, chat, and
              screen sharing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              className=" bg-gradient-to-r text-white from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-lg px-8 py-6"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Start Learning
            </Button>
            <Button variant="outline" size="lg" className="text-lg  px-8 py-6">
              <Play className="h-5 w-5 mr-2" />
              Become a Tutor
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                10k+ Active Users
              </span>
            </div>

            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.9</span>
              <span className="text-sm text-muted-foreground">
                (2.1k reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-500">
            <img
              src={heroImage}
              alt="Students and mentors learning together"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Floating Cards */}
          <div className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-md border transition-transform hover:scale-105 duration-300">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Live Session</span>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-md border transition-transform hover:scale-105 duration-300">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">1,200+ Subjects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
