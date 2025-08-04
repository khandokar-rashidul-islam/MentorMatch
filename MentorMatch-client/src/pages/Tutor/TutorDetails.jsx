import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import TutorProfile from "./TutorProfile";
import ReviewSection from "./ReviewSection";
import FAQSection from "./FAQSection";
import BookingPlans from "./BookingPlans";

const TutorDetails = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Find Tutors", href: "/tutors" },
    { label: "Mathematics", href: "/tutors/mathematics" },
    { label: "Dr. Sarah Johnson" }
  ];

  return (
    <div className="min-h-screen mt-20 bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
            <TutorProfile />

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Services & Specializations</h3>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Academic Support</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Homework assistance</li>
                      <li>• Test preparation</li>
                      <li>• Concept clarification</li>
                      <li>• Study strategies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Exam Preparation</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• SAT/ACT Math sections</li>
                      <li>• AP Calculus & Physics</li>
                      <li>• GRE Quantitative</li>
                      <li>• College entrance exams</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ReviewSection />
            
            <FAQSection />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <BookingPlans />

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold mb-3 sm:mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students:</span>
                    <span className="font-medium">500+</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Years Teaching:</span>
                    <span className="font-medium">10+</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">2 hours</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate:</span>
                    <span className="font-medium text-success">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-semibold mb-3 sm:mb-4">Availability</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday", time: "9:00 AM - 6:00 PM" },
                    { day: "Tuesday", time: "9:00 AM - 6:00 PM" },
                    { day: "Wednesday", time: "9:00 AM - 6:00 PM" },
                    { day: "Thursday", time: "9:00 AM - 6:00 PM" },
                    { day: "Friday", time: "9:00 AM - 4:00 PM" },
                    { day: "Weekend", time: "By appointment" },
                  ].map(({ day, time }) => (
                    <div className="flex justify-between items-center" key={day}>
                      <span className="text-muted-foreground">{day}</span>
                      <span className="text-sm">{time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>


    </div>
  );
};

export default TutorDetails;
