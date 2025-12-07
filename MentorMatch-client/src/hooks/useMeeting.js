import { useState, useCallback } from "react";

const mockParticipants = [
  {
    id: "1",
    name: "You",
    isMuted: false,
    isCameraOff: false,
    isScreenSharing: false,
    isHost: true,
    isSpeaking: false,
    hasRaisedHand: false,
    joinedAt: new Date(),
  },
  {
    id: "2",
    name: "Alex Morgan",
    isMuted: false,
    isCameraOff: false,
    isScreenSharing: false,
    isHost: false,
    isSpeaking: true,
    hasRaisedHand: false,
    joinedAt: new Date(),
  },
];

const mockMessages = [
  {
    id: "1",
    senderId: "2",
    senderName: "Alex Morgan",
    content: "Hi! Can you hear me okay?",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "2",
    senderId: "1",
    senderName: "You",
    content: "Yes, perfectly clear!",
    timestamp: new Date(Date.now() - 60000),
  },
];

export function useMeeting() {
  const [meetingState, setMeetingState] = useState({
    meetingId: "meet-7x9k2m",
    meetingTitle: "Video Call",
    participants: mockParticipants,
    messages: mockMessages,
    isRecording: false,
    viewMode: "grid",
  });

  const [localState, setLocalState] = useState({
    isMuted: false,
    isCameraOff: false,
    isScreenSharing: false,
    hasRaisedHand: false,
  });

  const toggleMute = useCallback(() => {
    setLocalState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  }, []);

  const toggleCamera = useCallback(() => {
    setLocalState((prev) => ({ ...prev, isCameraOff: !prev.isCameraOff }));
  }, []);

  const toggleScreenShare = useCallback(() => {
    setLocalState((prev) => ({
      ...prev,
      isScreenSharing: !prev.isScreenSharing,
    }));
  }, []);

  const toggleRaiseHand = useCallback(() => {
    setLocalState((prev) => ({ ...prev, hasRaisedHand: !prev.hasRaisedHand }));
  }, []);

  const toggleRecording = useCallback(() => {
    setMeetingState((prev) => ({ ...prev, isRecording: !prev.isRecording }));
  }, []);

  const setViewMode = useCallback((mode) => {
    setMeetingState((prev) => ({ ...prev, viewMode: mode }));
  }, []);

  const sendMessage = useCallback((content) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: "1",
      senderName: "You",
      content,
      timestamp: new Date(),
    };
    setMeetingState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }));
  }, []);

  const leaveMeeting = useCallback(() => {
    console.log("Leaving meeting...");
  }, []);

  return {
    meetingState,
    localState,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    toggleRaiseHand,
    toggleRecording,
    setViewMode,
    sendMessage,
    leaveMeeting,
  };
}
