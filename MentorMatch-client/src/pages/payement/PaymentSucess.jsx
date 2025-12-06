import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const PaymentSucess = () => {
    const navigate = useNavigate();
    const {id}=useParams()
  return (
    <div className='min-h-screen w-11/12 mx-auto px-4 md:px-6 lg:px-8 py-6 pt-20'>
        <Card className="text-center shadow-elegant border-success/20">
          <CardHeader className="space-y-6 pb-8">
            <div className="mx-auto w-20 h-20 bg-success/10 rounded-full flex items-center justify-center animate-pulse-glow">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <div> 
              <p className="text-primary font-semibold">{id}</p>
              <CardTitle className="text-3xl mb-2 text-success">Payment Successful!</CardTitle>
              <p className="text-muted-foreground text-lg">
                Your booking has been confirmed
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* {orderData && (
              <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-left">Order Details</h3>
                <Separator />
                
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{orderData.planTitle}</span>
                  </div>
                  
                  {orderData.sessions && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sessions</span>
                      <span className="font-medium">{orderData.sessions}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="font-semibold text-lg text-success">
                      ${orderData.total}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transaction ID</span>
                    <span className="font-mono text-sm">
                      {Math.random().toString(36).substring(2, 15).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )} */}

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
              <p className="text-sm text-foreground">
                A confirmation email has been sent to your registered email address with all the booking details.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard/learner/all-gigs")}
                className="w-full"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to All Gigs
              </Button>
              <Button 
                onClick={() => navigate("/dashboard/learner/bookings")}
                className="w-full text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                View My Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default PaymentSucess