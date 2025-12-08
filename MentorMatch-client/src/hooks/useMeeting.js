import { useVideoCall } from "@/context/useVideoCall";
import { useAppSelector } from "@/redux/hooks";

export const useMeeting = () => {
  const { user } = useAppSelector((state) => state.auth);

  // 1. Get callStatus from the provider
  const {
    stream,
    remoteStream,
    callStatus, 
    remoteUserId,
    isMuted,
    isCameraOff,
    isScreenSharing,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    leaveMeeting,
  } = useVideoCall();

  // Map streams to Participant objects
  const participants = [
    {
      id: "1",
      name: user?.name || "You",
      isLocal: true,
      stream: stream,
      isMuted: isMuted,
      isCameraOff: isCameraOff,
      isSpeaking: false,
    },
  ];

  if (remoteStream) {
    participants.push({
      id: remoteUserId || "2",
      name: "Remote User",
      isLocal: false,
      stream: remoteStream,
      isMuted: false,
      isCameraOff: false,
      isSpeaking: false,
    });
  }

  const meetingState = {
    meetingId: "active-session",
    participants,
    messages: [],
    viewMode: "grid",
    isRecording: false,
    status: callStatus, 
  };

  const localState = {
    isMuted,
    isCameraOff,
    isScreenSharing,
    hasRaisedHand: false,
  };

  // Stub functions
  const toggleRecording = () => console.log("Recording not implemented");
  const toggleRaiseHand = () => console.log("Raise hand not implemented");
  const setViewMode = (mode) => console.log("View mode set to:", mode);
  const sendMessage = (text) => console.log("Message:", text);

  return {
    meetingState,
    localState,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleRecording,
    toggleRaiseHand,
    setViewMode,
    sendMessage,
    leaveMeeting,
  };
};
