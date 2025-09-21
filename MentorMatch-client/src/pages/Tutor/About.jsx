import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetActiveProfileQuery } from "../../redux/features/user/userApi";

const About = ({data}) => {

  // const { data } = useGetActiveProfileQuery(null, {
  //   refetchOnMountOrArgChange: true,
  // });
  const profile = data?.data?.user?.profile;
  // console.log(profile)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        {/* About section */}
        <div className="">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
            About
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {profile?.about}
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
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Education</h3>
          <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {
              profile?.educationDetails.map((edu,index) => (
                <div className="flex items-start gap-2 border-l-2 p-3 border-primary" key={index}>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-muted-foreground">Massachusetts Institute of Technology (MIT)</p>
                    <p className="text-sm text-muted-foreground">cgpa: {edu.gpa}</p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
