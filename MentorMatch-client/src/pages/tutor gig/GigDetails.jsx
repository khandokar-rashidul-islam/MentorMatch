import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Car, CheckCircle, Loader2 } from "lucide-react";
import Breadcrumbs from "../../components/shared/Breadcrumbs";
import BookingPlans from "../Tutor/BookingPlans";
import ReviewSection from "../Tutor/ReviewSection";
import FAQSection from "../Tutor/FAQSection";
import GigStats from "./GigStats";
import CommentSection from "./CommentSection";
import GigHeader from "./GigHeader";
import { useParams } from "react-router";
import { useGetGigByIdQuery } from "../../redux/features/mentor/mentor.api";
import ServicePlans from "./ServicePlans";
import GigSuggestions from "./GigSuggestions";
import { useAppSelector } from "../../redux/hooks";
import GigDetailsSkeleton from "./GigDetailsSkeleton";

const GigDetails = () => {
  const { id } = useParams();
  const { data: gig, isLoading, isError } = useGetGigByIdQuery(id);
  const { user } = useAppSelector((state) => state.auth); // current logged-in user
  console.log(user);
  // === Loading State ===
  if (isLoading) {
    return (
      // <div className="flex justify-center items-center h-60 min-h-screen">
      //   <Loader2 className="animate-spin w-6 h-6 text-primary" />
      // </div>
      <GigDetailsSkeleton/>
    );
  }

  // === Error State ===
  if (isError || !gig) {
    return (
      <div className="text-center text-red-500 py-10 text-lg font-medium">
        Failed to load gig details.
      </div>
    );
  }

  // === Dynamic Data Extraction ===
  const subjects = gig.data.relatedTopics || [];
  const faqs = gig.data.faqs || [];
  const about = gig.data.aboutGig || "No description provided.";
  //const tutor = gig.tutor || gig.mentor || {};
  const plans = gig.data.plans || {};
  const services = gig.data.services || [];

  console.log("Gig Data:", gig);
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <main className="w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20">
        {/* === Gig Header === */}
        <div className="mb-8">
          <GigHeader gig={gig} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === Main Content === */}
          <div className="lg:col-span-2 space-y-8">
            {/* === About This Gig === */}
            <Card>
              <CardHeader>
                <CardTitle>About This Tutoring Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {about}
                  </p>
                </div>

                {services?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">What You’ll Get:</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {services.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* === Subjects Covered === */}
            {subjects.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Subjects & Topics Covered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* === Booking Plans === */}
            {plans && <ServicePlans plans={plans} />}

            {/* === FAQ Section === */}
            {faqs.length > 0 && <FAQSection faqs={faqs} />}

            {/* === Reviews / Comments === */}
            <ReviewSection
              gigId={gig.data._id}
              gigOwnerId={gig.data.user._id}
              userId={user._id} //current logged-in user ID
              userRole={user.activeRole}
            />
          </div>

          {/* === Sidebar === */}
          <div className="space-y-6">
            {/* === Gig Stats === */}
            <GigStats gig={gig} />

            {/* === Quick Contact / Pricing === */}
            {/* <Card>
              <CardHeader>
                <CardTitle>Contact Tutor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    Starting at ${plans?.instant?.price || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per session
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Delivery Time:
                    </span>
                    <span className="font-medium">
                      {gig.deliveryTime || "Flexible"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revisions:</span>
                    <span className="font-medium">
                      {gig.revisions || "Unlimited"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue:</span>
                    <Badge
                      variant="outline"
                      className="text-success border-success text-xs"
                    >
                      {gig.availableSpots
                        ? `${gig.availableSpots} spots available`
                        : "Currently full"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* === Related Skills === */}
            {gig.skills?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {gig.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* === Gig Suggestions / Carousel === */}
        {user.activeRole === "learner" && (
          <Card className="mt-8 px-5 ">
            <h1 className="text-2xl font-bold ">Related services</h1>
            <GigSuggestions gig={gig} />
          </Card>
        )}
      </main>
    </div>
  );
};

export default GigDetails;
