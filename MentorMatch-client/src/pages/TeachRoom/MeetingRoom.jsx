import { useState } from "react";
import { useMeeting } from "@/hooks/useMeeting";
import { VideoGrid } from "./VideoGrid";
import { ControlBar } from "./ControlBar";
import { ChatPanel } from "./ChatPanel";
import { Whiteboard } from "./Whiteboard";
import { Loader2, VideoOff } from "lucide-react"; 
import { Button } from "@/components/ui/button"; 
import { useVideoCall } from "@/context/useVideoCall";

export function MeetingRoom() {
  const {
    meetingState,
    localState,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    leaveMeeting,
    toggleRecording,
    toggleRaiseHand,
    setViewMode,
    sendMessage,
  } = useMeeting();

  // Get the error directly from the context hook
  const { mediaError } = useVideoCall();

  const [chatOpen, setChatOpen] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);

  // 1. Error State (Device in Use / Permission Denied)
  //
  if (mediaError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="bg-destructive/10 p-6 rounded-full mb-4">
          <VideoOff className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Camera Access Failed
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md">{mediaError}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Reload Page
        </Button>
      </div>
    );
  }

  // 2. Initial Loading State (Context not ready)
  if (!meetingState || !localState) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium">
          Initializing Meeting Room...
        </p>
      </div>
    );
  }

  // 3. Connection Status Check (Smart Loading)
  if (
    meetingState.status === "joining" ||
    meetingState.status === "connecting"
  ) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium uppercase tracking-widest">
          {meetingState.status === "joining"
            ? "Joining Room..."
            : "Connecting to Peer..."}
        </p>
      </div>
    );
  }

  // --- Main UI ---

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    if (!chatOpen) setWhiteboardOpen(false);
  };

  const toggleWhiteboard = () => {
    setWhiteboardOpen((prev) => !prev);
    if (!whiteboardOpen) setChatOpen(false);
  };

  const handleSendMessage = (text) => {
    if (sendMessage) sendMessage(text);
  };

  const handleToggleScreenShare = () => {
    if (toggleScreenShare) toggleScreenShare();
    else console.warn("Screen share not implemented");
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col relative">
          <VideoGrid
            participants={meetingState.participants || []}
            viewMode={meetingState.viewMode || "grid"}
            localState={localState}
          />
        </div>

        {/* Panels */}
        {chatOpen && (
          <ChatPanel
            messages={meetingState.messages || []}
            onSendMessage={handleSendMessage}
            onClose={() => setChatOpen(false)}
          />
        )}

        {whiteboardOpen && (
          <Whiteboard onClose={() => setWhiteboardOpen(false)} />
        )}
      </div>

      <ControlBar
        localState={localState}
        meetingId={meetingState.meetingId}
        isRecording={meetingState.isRecording || false}
        viewMode={meetingState.viewMode || "grid"}
        // UI State
        chatOpen={chatOpen}
        whiteboardOpen={whiteboardOpen}
        // Core Actions
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onLeaveMeeting={leaveMeeting}
        // UI Actions
        onToggleChat={toggleChat}
        onToggleWhiteboard={toggleWhiteboard}
        onToggleScreenShare={handleToggleScreenShare}
        // Placeholders
        onToggleRecording={toggleRecording || (() => {})}
        onToggleRaiseHand={toggleRaiseHand || (() => {})}
        onSetViewMode={setViewMode || (() => {})}
      />
    </div>
  );
}
