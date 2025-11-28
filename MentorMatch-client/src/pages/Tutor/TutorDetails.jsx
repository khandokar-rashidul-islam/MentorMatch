import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import TutorProfile from "./TutorProfile";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import BookingPlans from "./BookingPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Star,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import About from "./About";
import Posts from "./Posts";
import Gigs from "./Gigs";
import { useGetActiveProfileQuery } from "../../redux/features/user/userApi";
import Certifications from "./Certifications";
import { useAppSelector } from "../../redux/hooks";
import { useParams } from "react-router";
import { useGetMentorByIdQuery } from "../../redux/features/learner/learner.api";
import MentorReviews from "./MentorReviews";
import Availability from "./Availability";
import TutorDetailsSkeleton from "./TutorDetailsSkeleton";

const TutorDetails = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { id } = useParams();
  console.log(id);
  const role = user?.activeRole;



  const {
    data: mentorData,
    isLoading: isMentorLoading,
    isError: isMentorError,
  } = useGetMentorByIdQuery(id, { skip: role !== "learner" });

  const {
    data: activeProfileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetActiveProfileQuery(null, {
    skip: role === "learner",
    refetchOnMountOrArgChange: true,
  });

  const isLoading = isMentorLoading || isProfileLoading;
  const isError = isMentorError || isProfileError;
  const data = role === "learner" ? mentorData : activeProfileData;
  const availability = data?.data?.user.profile.availability;
  // console.log("data from tutor details:", data?.data?.user.profile.availability);

  if (isLoading) return <TutorDetailsSkeleton />;
  // return <div className="min-h-screen text-center pt-20">Loading....</div>;
  if (isError)
    return (
      <div className="min-h-screen text-center pt-55 text-red-500">
        Error loading profile!
      </div>
    );

  return (
    <div className="min-h-screen mt-20 bg-gradient-subtle mb-4">
      <main className="w-11/12 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        {/* <div className="mb-4 sm:mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div> */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}

          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <TutorProfile data={data} />
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  About
                </TabsTrigger>
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  All Posts
                </TabsTrigger>
                <TabsTrigger value="gigs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  All Gigs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <div className="space-y-4 sm:space-y-6">
                  {/* About Me */}
                  <About data={data} />
                  <Certifications
                    certifications={data?.data?.user?.profile?.certifications}
                  />
                </div>
              </TabsContent>

              {/* post tab */}
              <TabsContent value="posts" className="mt-4">
                <Posts />
              </TabsContent>

              {/* gigs tab */}
              <TabsContent value="gigs" className="mt-4">
                <Gigs mentorId={data?.data?.user?.profile.user} />
              </TabsContent>
            </Tabs>
            <div className="xl:hidden space-y-4 sm:space-y-6 ">
              <BookingPlans data={data} />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Weekly Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3">
                    {availability.map(({ day, time }) => (
                      <div
                        className="flex justify-between items-center"
                        key={day}
                      >
                        <span className="text-muted-foreground">{day}</span>
                        <span className="text-sm">{time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* REVIEWS */}
            <MentorReviews
              mentorId={data?.data?.user?.profile.user}
              userId={user._id} //current logged-in user ID
              userRole={role}
            />
            {/* FAQ */}
            <FAQSection faqs={data?.data?.user?.profile?.faqs} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 hidden xl:block">
            <div className="">
              <BookingPlans data={data} />
            </div>
            {/* Availability */}
            <Availability availability={availability} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDetails;
