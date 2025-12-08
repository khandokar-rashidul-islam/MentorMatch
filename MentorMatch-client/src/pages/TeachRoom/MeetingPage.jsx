import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { VideoCallProvider } from "@/context/VideoCallProvider";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MeetingRoom } from "./MeetingRoom";
import { useVerifySessionQuery } from "@/redux/features/bookings/payment.api";

const MeetingPage = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, error, isSuccess } =
    useVerifySessionQuery(meetingId);

  useEffect(() => {
    if (isError) {
      console.error("Session verification failed:", error);
      const message = error?.data?.message || "Cannot join session";
      toast.error(message);
      navigate(-1);
    }
  }, [isError, error, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium">
          Verifying Session Access...
        </p>
      </div>
    );
  }

  if (!isSuccess) return null;

  return (
    <VideoCallProvider meetingId={meetingId}>
      <MeetingRoom/>
    </VideoCallProvider>
  );
};

export default MeetingPage;
