import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetGigByIdQuery } from "@/redux/features/mentor/mentor.api";
import { ArrowLeft, CheckCircle, CreditCard } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Payment = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);

  const gig = query.get("gig");
  const plan = query.get("plan");
  const price = query.get("price");
  const type = query.get("type");
  const packageType = query.get("package");

  if (!search || !gig || !type || !plan || !price || !packageType) {
    return (
      <div className="min-h-screen bg-gradient-subtle pt-20">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center p-8">
            <CardTitle className="mb-4">No Plan Selected</CardTitle>
            <p className="text-muted-foreground mb-6">
              Please select a plan to proceed with payment.
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </Card>
        </main>
      </div>
    );
  }

  const { data: gigData, isLoading, isError } = useGetGigByIdQuery(gig);

  const planData =
    type === "instant"
      ? gigData?.data.plans?.instant
      : gigData?.data.plans[type][packageType];

  const paySuccess = true;
  const handlePayNow = () => {
    if (!paySuccess) {
      navigate("/dashboard/learner/payment-failed");
      return toast.error("Payment Failed! Please try again.");
    }
    navigate("/dashboard/learner/payment-success");
    toast.success("Payment Successful!");
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Gig
      </Button>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose your preferred payment method
              </p>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="flex items-center gap-3 w-full">
                    <CreditCard className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-xs text-muted-foreground">
                        Visa, Mastercard, Amex
                      </p>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-white">P</span>
                    </div>
                    <div className="text-left">
                      <p className="font-medium">PayPal</p>
                      <p className="text-xs text-muted-foreground">
                        Pay securely with PayPal
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Selected Plan</h3>
                <p className="text-2xl font-bold">{plan}</p>
                {/* {planData.sessions && (
                  <p className="text-muted-foreground">{planData.sessions}</p>
                )}
                {planData.duration && (
                  <p className="text-muted-foreground">{planData.duration}</p>
                )} */}
              </div>

              {planData?.features && planData?.features?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {planData?.features?.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-medium">${planData?.price}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">
                    ${planData?.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handlePayNow}>
                Pay Now ${planData?.price.toFixed(2)}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By proceeding, you agree to our Terms of Service and Privacy
                Policy. Your payment information is secure and encrypted.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payment;
