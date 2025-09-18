import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetActiveProfileQuery } from "../../redux/features/user/userApi";

const About = () => {
  
  const { data } = useGetActiveProfileQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const profile = data?.data?.user?.profile;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* About section */}
        <div className="">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            About
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {profile?.bio}
          </p>
        </div>

        {/* Subjects taught */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Subjects I Teach
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile?.skills.map((subject) => (
              <Badge
                key={subject}
                variant="outline"
                className="justify-center items-center py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-600 hover:text-white "
              >
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            Hourly Rates
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                $45
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Group Sessions
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                $80
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                1-on-1 Sessions
              </div>
            </div>
            <div className="text-center p-3 sm:p-4 border border-border rounded-lg bg-gradient-subtle">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                $120
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Premium Package
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
