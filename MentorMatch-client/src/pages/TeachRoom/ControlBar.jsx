import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  PhoneOff,
  Circle,
  LayoutGrid,
  Presentation,
  Settings,
  Captions,
  Hand,
  Link,
  Clock,
  PenTool,
} from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export function ControlBar({
  localState,
  meetingId,
  isRecording,
  viewMode,
  chatOpen,
  whiteboardOpen,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onToggleRecording,
  onToggleRaiseHand,
  onSetViewMode,
  onToggleChat,
  onToggleWhiteboard,
  onLeaveMeeting,
}) {

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(`https://meet.example.com/${meetingId}`);
  };

  return (
    <div className="h-16 sm:h-20 px-2 sm:px-4 md:px-6 flex items-center justify-between  backdrop-blur-xl border-t border-border/50 animate-slide-up">
      {/* Left Section */}
      <div className="hidden sm:flex items-center gap-2 md:gap-3 min-w-0 md:min-w-[200px]">
        <div className="flex items-center gap-1.5 md:gap-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-medium">
            {formatDuration(duration)}
          </span>
          <span className="text-xs md:text-sm opacity-60 hidden md:inline">
            •
          </span>
          <span className="text-xs md:text-sm hidden md:inline">
            {formatTime(currentTime)}
          </span>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={copyMeetingLink}
              className="p-1.5 md:p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
            >
              <Link className="w-3.5 h-3.5 md:w-4 md:h-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            Copy meeting link
          </TooltipContent>
        </Tooltip>

        {isRecording && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-destructive/10 text-destructive rounded-full">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-destructive rounded-full animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium">REC</span>
          </div>
        )}
      </div>

      {/* Center Controls */}
      <div className="flex justify-center items-center gap-1 sm:gap-1.5 md:gap-2">
        {/* Mic */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleMute}
              className={cn(
                " w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12  flex justify-center items-center rounded-full  hover:bg-muted-foreground   ",
                localState.isMuted && "control-btn-active"
              )}
            >
              {localState.isMuted ? (
                <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            {localState.isMuted ? "Unmute" : "Mute"}
          </TooltipContent>
        </Tooltip>

        {/* Camera */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleCamera}
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full  hover:bg-muted-foreground     ",
                localState.isCameraOff && "control-btn-active"
              )}
            >
              {localState.isCameraOff ? (
                <VideoOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 " />
              ) : (
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            {localState.isCameraOff ? "Turn on camera" : "Turn off camera"}
          </TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleScreenShare}
              className={cn(
                "control-btn w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full  hover:bg-muted-foreground ",
                localState.isScreenSharing && "control-btn-primary",
                "invisible sm:visible" // <-- key fix
              )}
            >
              {localState.isScreenSharing ? (
                <MonitorOff className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            {localState.isScreenSharing ? "Stop sharing" : "Share screen"}
          </TooltipContent>
        </Tooltip>

        {/* Settings Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="control-btn w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full  hover:bg-muted-foreground  ">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="center" className="w-52">
            <DropdownMenuLabel>View</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => onSetViewMode("grid")}>
              <LayoutGrid
                className={cn(
                  "w-4 h-4 mr-3",
                  viewMode === "grid" && "text-primary"
                )}
              />
              Grid view
              {viewMode === "grid" && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onSetViewMode("speaker")}>
              <Presentation
                className={cn(
                  "w-4 h-4 mr-3",
                  viewMode === "speaker" && "text-primary"
                )}
              />
              Speaker view
              {viewMode === "speaker" && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Features</DropdownMenuLabel>

            <DropdownMenuItem onClick={onToggleRaiseHand}>
              <Hand
                className={cn(
                  "w-4 h-4 mr-3",
                  localState.hasRaisedHand && "text-primary"
                )}
              />
              {localState.hasRaisedHand ? "Lower hand" : "Raise hand"}
              {localState.hasRaisedHand && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onToggleWhiteboard}>
              <PenTool
                className={cn("w-4 h-4 mr-3", whiteboardOpen && "text-primary")}
              />
              Whiteboard
              {whiteboardOpen && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>

            {/* Mobile screen share */}
            <DropdownMenuItem
              onClick={onToggleScreenShare}
              className="sm:hidden"
            >
              <Monitor
                className={cn(
                  "w-4 h-4 mr-3",
                  localState.isScreenSharing && "text-primary"
                )}
              />
              {localState.isScreenSharing ? "Stop sharing" : "Share screen"}
              {localState.isScreenSharing && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onToggleRecording}>
              <Circle
                className={cn(
                  "w-4 h-4 mr-3",
                  isRecording && "fill-destructive text-destructive"
                )}
              />
              {isRecording ? "Stop recording" : "Start recording"}
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Captions className="w-4 h-4 mr-3" />
              Turn on captions
            </DropdownMenuItem>

            {/* Mobile copy link */}
            <DropdownMenuItem onClick={copyMeetingLink} className="sm:hidden">
              <Link className="w-4 h-4 mr-3" />
              Copy meeting link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="w-px h-6 sm:h-8 bg-border mx-1 sm:mx-2 hidden sm:block" />

        {/* Chat */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleChat}
              className={cn(
                "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full  hover:bg-muted-foreground ",
                chatOpen && "bg-accent text-accent-foreground"
              )}
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            Chat
          </TooltipContent>
        </Tooltip>

        {/* Divider */}
        <div className="w-px h-6 sm:h-8 bg-border mx-1 sm:mx-2" />

        {/* Leave */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onLeaveMeeting}
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex justify-center items-center rounded-full  hover:bg-muted-foreground bg-red-600  "
            >
              <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="font-medium">
            Leave call
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Right Placeholder */}
      <div className="hidden sm:block min-w-0 md:min-w-[200px]" />
    </div>
  );
}
