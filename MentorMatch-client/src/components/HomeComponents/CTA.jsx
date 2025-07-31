import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <div className="py-20">
      <div className="w-11/12 mx-auto px-4">
        <div className=" mx-auto">
          <Card className="overflow-hidden shadow-xl rounded-2xl">
            <CardContent className="p-0">
              {/* CTA Header */}
              <div className="bg-secondary text-primary p-12 text-center">
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary border border-primary/20"
                >
                  Ready to Get Started?
                </Badge>

                <h2 className="text-4xl font-bold mb-4">
                  Join MentorMatch Today
                </h2>

                <p className="text-xl text-primary/90 mb-8 max-w-2xl mx-auto">
                  Whether you want to learn something new or share your
                  expertise, our platform makes it easy to connect and grow
                  together.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-primary text-secondary hover:bg-white/90 text-lg px-8 py-6 cursor-pointer"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Start Learning
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 cursor-pointer"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Become a Tutor
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* CTA Footer Info */}
              <div className="bg-background p-8">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Free to Join
                    </h3>
                    <p className="text-muted-foreground">
                      No setup fees or monthly subscriptions
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Quick Setup
                    </h3>
                    <p className="text-muted-foreground">
                      Create your profile in under 5 minutes
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      Secure Platform
                    </h3>
                    <p className="text-muted-foreground">
                      Protected payments and verified users
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CTA;
