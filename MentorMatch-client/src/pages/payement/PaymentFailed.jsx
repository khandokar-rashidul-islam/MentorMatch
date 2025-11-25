import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, Home, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const errorMessage = "We couldn't process your payment. Please try again.";
  return (
    <div className="min-h-screen w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20">
      <Card className="text-center shadow-elegant border-destructive/20">
        <CardHeader className="space-y-6 pb-8">
          <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <XCircle className="h-12 w-12 text-destructive" />
          </div>
          <div>
            <CardTitle className="text-3xl mb-2 text-destructive">
              Payment Failed
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Your transaction could not be completed
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-destructive/5 rounded-lg p-6 border border-destructive/10">
            <h3 className="font-semibold mb-3 text-left">What happened?</h3>
            <p className="text-sm text-muted-foreground text-left">
              {errorMessage}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 space-y-3">
            <h4 className="font-medium text-left">
              Common reasons for payment failure:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-2 text-left list-disc list-inside">
              <li>Insufficient funds in your account</li>
              <li>Incorrect card details or expired card</li>
              <li>Network connectivity issues</li>
              <li>Bank declined the transaction</li>
              <li>Payment gateway timeout</li>
            </ul>
          </div>

          <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
            <p className="text-sm text-foreground flex items-start gap-2">
              <HelpCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
              <span>
                If the problem persists, please contact your bank or try a
                different payment method.
              </span>
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>

          <Button
            variant="link"
            onClick={() => navigate(-1)}
            className="text-sm text-muted-foreground"
          >
            Need help? Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;
