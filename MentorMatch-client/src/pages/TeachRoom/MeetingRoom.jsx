import { useState } from "react";
import { useMeeting } from "@/hooks/useMeeting";
import { VideoGrid } from "./VideoGrid";
import { ControlBar } from "./ControlBar";
import { ChatPanel } from "./ChatPanel";
import { Whiteboard } from "./Whiteboard";

export function MeetingRoom() {
  const {
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
  } = useMeeting();

  const [chatOpen, setChatOpen] = useState(false);
  const [whiteboardOpen, setWhiteboardOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    if (!chatOpen) setWhiteboardOpen(false);
  };

  const toggleWhiteboard = () => {
    setWhiteboardOpen((prev) => !prev);
    if (!whiteboardOpen) setChatOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col relative">
          <VideoGrid
            participants={meetingState.participants}
            viewMode={meetingState.viewMode}
            localState={localState}
          />
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <ChatPanel
            messages={meetingState.messages}
            onSendMessage={sendMessage}
            onClose={() => setChatOpen(false)}
          />
        )}

        {/* Whiteboard Panel */}
        {whiteboardOpen && (
          <Whiteboard onClose={() => setWhiteboardOpen(false)} />
        )}
      </div>

      <ControlBar
        localState={localState}
        meetingId={meetingState.meetingId}
        isRecording={meetingState.isRecording}
        viewMode={meetingState.viewMode}
        chatOpen={chatOpen}
        whiteboardOpen={whiteboardOpen}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onToggleScreenShare={toggleScreenShare}
        onToggleRecording={toggleRecording}
        onToggleRaiseHand={toggleRaiseHand}
        onSetViewMode={setViewMode}
        onToggleChat={toggleChat}
        onToggleWhiteboard={toggleWhiteboard}
        onLeaveMeeting={leaveMeeting}
      />
    </div>
  );
}
